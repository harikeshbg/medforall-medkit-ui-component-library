import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { DataTable, type ColumnDef } from "./DataTable";

type Row = { id: string; name: string };

const cols: ColumnDef<Row>[] = [{ key: "name", header: "Name", render: (r) => r.name }];

describe("DataTable", () => {
  it("calls onPageChange", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <DataTable
        rows={[{ id: "1", name: "Alex" }]}
        columns={cols}
        rowId={(r) => r.id}
        page={1}
        pageSize={10}
        totalRows={25}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("is accessible", async () => {
    const { container } = render(
      <DataTable
        rows={[{ id: "1", name: "Alex" }]}
        columns={cols}
        rowId={(r) => r.id}
        page={1}
        pageSize={10}
        totalRows={1}
        onPageChange={() => {}}
      />
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);

  });
});
