import React, { useMemo } from "react";
import styles from "./DataTable.module.css";

export type SortDir = "asc" | "desc";
export interface SortState { key: string; dir: SortDir; }

export interface ColumnDef<T> {
  key: string;
  header: string;
  width?: number | string;
  sortable?: boolean;
  render: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
}

export interface DataTableProps<T> {
  rows: T[];
  columns: ColumnDef<T>[];
  rowId: (row: T) => string;
  page: number;
  pageSize: number;
  totalRows: number;
  onPageChange: (page: number) => void;

  sort?: SortState;
  onSortChange?: (sort: SortState) => void;

  selectedIds?: Set<string>;
  onSelectionChange?: (next: Set<string>) => void;

  ariaLabel?: string;
}

export function DataTable<T>(props: DataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(props.totalRows / props.pageSize));
  const sel = props.selectedIds ?? new Set<string>();

  const allOnPageIds = useMemo(() => new Set(props.rows.map(props.rowId)), [props.rows, props.rowId]);

  function toggleAll() {
    const next = new Set(sel);
    const allSelected = [...allOnPageIds].every((id) => next.has(id));
    if (allSelected) {
      for (const id of allOnPageIds) next.delete(id);
    } else {
      for (const id of allOnPageIds) next.add(id);
    }
    props.onSelectionChange?.(next);
  }

  function toggleOne(id: string) {
    const next = new Set(sel);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    props.onSelectionChange?.(next);
  }

  function sortClick(colKey: string) {
    if (!props.onSortChange) return;
    const current = props.sort;
    if (!current || current.key !== colKey) props.onSortChange({ key: colKey, dir: "asc" });
    else props.onSortChange({ key: colKey, dir: current.dir === "asc" ? "desc" : "asc" });
  }

  return (
    <div className={styles.wrap} aria-label={props.ariaLabel ?? "data table"}>
      <div className={styles.toolbar}>
        <div style={{ fontSize: 12, color: "var(--mk-muted)" }}>
          Page {props.page} of {totalPages} • {props.totalRows} rows
        </div>
        <div className={styles.pager}>
          <button className={styles.btn} onClick={() => props.onPageChange(1)} disabled={props.page <= 1}>First</button>
          <button className={styles.btn} onClick={() => props.onPageChange(props.page - 1)} disabled={props.page <= 1}>Prev</button>
          <button className={styles.btn} onClick={() => props.onPageChange(props.page + 1)} disabled={props.page >= totalPages}>Next</button>
          <button className={styles.btn} onClick={() => props.onPageChange(totalPages)} disabled={props.page >= totalPages}>Last</button>
        </div>
      </div>

      <table className={styles.table} role="grid">
        <thead>
          <tr>
            <th className={styles.th} style={{ width: 42 }}>
              <input
                type="checkbox"
                aria-label="select all rows on page"
                checked={[...allOnPageIds].length > 0 && [...allOnPageIds].every((id) => sel.has(id))}
                onChange={toggleAll}
              />
            </th>
            {props.columns.map((c) => (
              <th key={c.key} className={styles.th} style={{ width: c.width }}>
                {c.sortable && props.onSortChange ? (
                  <button className={styles.sortBtn} type="button" onClick={() => sortClick(c.key)} aria-label={`sort by ${c.header}`}>
                    {c.header}{props.sort?.key === c.key ? (props.sort.dir === "asc" ? " ▲" : " ▼") : ""}
                  </button>
                ) : (
                  c.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((r) => {
            const id = props.rowId(r);
            return (
              <tr key={id} className={styles.tr}>
                <td className={styles.td}>
                  <input
                    type="checkbox"
                    aria-label={`select row ${id}`}
                    checked={sel.has(id)}
                    onChange={() => toggleOne(id)}
                  />
                </td>
                {props.columns.map((c) => (
                  <td key={c.key} className={styles.td}>
                    {c.render(r)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
