import type { Meta, StoryObj } from "@storybook/react";
import React, { useMemo, useState } from "react";
import { DataTable, type ColumnDef, type SortState } from "./DataTable";

type Row = { id: string; name: string; age: number; status: string };

const ALL: Row[] = Array.from({ length: 137 }).map((_, i) => ({
  id: String(i + 1),
  name: ["Alex", "Sam", "Jordan", "Taylor", "Morgan"][i % 5] + " " + (i + 1),
  age: 18 + (i % 60),
  status: ["Active", "Pending", "Inactive"][i % 3]
}));

const columns: ColumnDef<Row>[] = [
  { key: "name", header: "Name", sortable: true, render: (r) => r.name, sortValue: (r) => r.name },
  { key: "age", header: "Age", sortable: true, render: (r) => r.age, sortValue: (r) => r.age },
  { key: "status", header: "Status", sortable: true, render: (r) => r.status, sortValue: (r) => r.status }
];

const meta: Meta<typeof DataTable<Row>> = {
  title: "MedKit/DataTable",
  component: DataTable
};
export default meta;
type Story = StoryObj<typeof DataTable<Row>>;

export const ServerLikePaging: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState<SortState | undefined>({ key: "name", dir: "asc" });
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const pageSize = 10;

    const view = useMemo(() => {
      let rows = [...ALL];
      const col = columns.find((c) => c.key === sort?.key);
      if (sort && col?.sortValue) {
        rows.sort((a, b) => {
          const av = col.sortValue!(a);
          const bv = col.sortValue!(b);
          if (av < bv) return sort.dir === "asc" ? -1 : 1;
          if (av > bv) return sort.dir === "asc" ? 1 : -1;
          return 0;
        });
      }
      const start = (page - 1) * pageSize;
      return rows.slice(start, start + pageSize);
    }, [page, sort]);

    return (
      <div style={{ maxWidth: 820 }}>
        <DataTable
          ariaLabel="patients table"
          rows={view}
          columns={columns}
          rowId={(r) => r.id}
          page={page}
          pageSize={pageSize}
          totalRows={ALL.length}
          onPageChange={setPage}
          sort={sort}
          onSortChange={setSort}
          selectedIds={selected}
          onSelectionChange={setSelected}
        />
        <div style={{ marginTop: 10, fontSize: 12 }}>
          Selected IDs: {[...selected].slice(0, 10).join(", ")}{selected.size > 10 ? "…" : ""}
        </div>
      </div>
    );
  }
};
