"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AppointmentCard: () => AppointmentCard,
  DataTable: () => DataTable,
  MedicationSearch: () => MedicationSearch,
  TimeSlotPicker: () => TimeSlotPicker,
  VitalSignsInput: () => VitalSignsInput
});
module.exports = __toCommonJS(index_exports);

// src/components/AppointmentCard/AppointmentCard.tsx
var import_react = require("react");

// src/components/AppointmentCard/AppointmentCard.module.css
var AppointmentCard_default = {};

// src/components/AppointmentCard/AppointmentCard.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function badgeClass(status) {
  if (status === "confirmed") return `${AppointmentCard_default.badge} ${AppointmentCard_default.badgeConfirmed}`;
  if (status === "pending") return `${AppointmentCard_default.badge} ${AppointmentCard_default.badgePending}`;
  return `${AppointmentCard_default.badge} ${AppointmentCard_default.badgeCancelled}`;
}
function AppointmentCard(props) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const menuRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    function onDocClick(e) {
      if (!open) return;
      const t = e.target;
      if (menuRef.current && !menuRef.current.contains(t)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { className: AppointmentCard_default.card, "aria-label": `Appointment for ${props.patientName}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: AppointmentCard_default.top, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: AppointmentCard_default.title, children: props.patientName }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: AppointmentCard_default.meta, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-label": "date", children: props.date }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-label": "time", children: props.time }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-label": "doctor", children: props.doctor }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-label": "type", children: props.type })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: AppointmentCard_default.actions, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: badgeClass(props.status), "aria-label": `status ${props.status}`, children: props.status }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: AppointmentCard_default.menu, ref: menuRef, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            className: AppointmentCard_default.button,
            "aria-haspopup": "menu",
            "aria-expanded": open,
            onClick: () => setOpen((v) => !v),
            children: "Actions"
          }
        ),
        open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: AppointmentCard_default.menuList, role: "menu", "aria-label": "appointment actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: AppointmentCard_default.menuItem, role: "menuitem", onClick: () => {
            setOpen(false);
            props.onViewDetails?.();
          }, children: "View details" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: AppointmentCard_default.menuItem, role: "menuitem", onClick: () => {
            setOpen(false);
            props.onReschedule?.();
          }, children: "Reschedule" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: AppointmentCard_default.menuItem, role: "menuitem", onClick: () => {
            setOpen(false);
            props.onCancel?.();
          }, children: "Cancel" })
        ] })
      ] })
    ] })
  ] }) });
}

// src/components/VitalSignsInput/VitalSignsInput.tsx
var import_react2 = require("react");

// src/components/VitalSignsInput/VitalSignsInput.module.css
var VitalSignsInput_default = {};

// src/components/VitalSignsInput/VitalSignsInput.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function clampNum(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
function VitalSignsInput({ value, onChange }) {
  const v = value ?? {};
  const [touched, setTouched] = (0, import_react2.useState)({});
  const bmi = (0, import_react2.useMemo)(() => {
    if (!v.heightCm || !v.weightKg) return void 0;
    const h = v.heightCm / 100;
    return v.weightKg / (h * h);
  }, [v.heightCm, v.weightKg]);
  function set(key, raw, min, max) {
    const num = raw.trim() === "" ? void 0 : Number(raw);
    const next = { ...v };
    if (num === void 0 || Number.isNaN(num)) {
      delete next[key];
      onChange(next);
      return;
    }
    next[key] = clampNum(num, min, max);
    onChange(next);
  }
  const errors = {
    bp: v.systolic && v.diastolic && v.systolic <= v.diastolic ? "Systolic must be greater than diastolic." : void 0
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: VitalSignsInput_default.wrap, "aria-label": "vital signs input", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: VitalSignsInput_default.grid, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: VitalSignsInput_default.field, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: VitalSignsInput_default.label, htmlFor: "mk-height", children: "Height (cm)" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            id: "mk-height",
            className: VitalSignsInput_default.input,
            inputMode: "decimal",
            value: v.heightCm ?? "",
            onBlur: () => setTouched((x) => ({ ...x, heightCm: true })),
            onChange: (e) => set("heightCm", e.target.value, 30, 250)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: VitalSignsInput_default.field, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: VitalSignsInput_default.label, htmlFor: "mk-weight", children: "Weight (kg)" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            id: "mk-weight",
            className: VitalSignsInput_default.input,
            inputMode: "decimal",
            value: v.weightKg ?? "",
            onBlur: () => setTouched((x) => ({ ...x, weightKg: true })),
            onChange: (e) => set("weightKg", e.target.value, 2, 400)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: VitalSignsInput_default.field, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: VitalSignsInput_default.label, htmlFor: "mk-sys", children: "Blood pressure (systolic)" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            id: "mk-sys",
            className: VitalSignsInput_default.input,
            inputMode: "numeric",
            value: v.systolic ?? "",
            onBlur: () => setTouched((x) => ({ ...x, bp: true })),
            onChange: (e) => set("systolic", e.target.value, 60, 250)
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: VitalSignsInput_default.field, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: VitalSignsInput_default.label, htmlFor: "mk-dia", children: "Blood pressure (diastolic)" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            id: "mk-dia",
            className: VitalSignsInput_default.input,
            inputMode: "numeric",
            value: v.diastolic ?? "",
            onBlur: () => setTouched((x) => ({ ...x, bp: true })),
            onChange: (e) => set("diastolic", e.target.value, 40, 180)
          }
        ),
        touched.bp && errors.bp && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: VitalSignsInput_default.error, children: errors.bp })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: VitalSignsInput_default.field, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: VitalSignsInput_default.label, htmlFor: "mk-temp", children: "Temperature (\xB0C)" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "input",
          {
            id: "mk-temp",
            className: VitalSignsInput_default.input,
            inputMode: "decimal",
            value: v.temperatureC ?? "",
            onChange: (e) => set("temperatureC", e.target.value, 30, 43)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: VitalSignsInput_default.summary, "aria-label": "computed summary", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("b", { children: "BMI:" }),
      " ",
      bmi ? bmi.toFixed(1) : "\u2014"
    ] }) })
  ] });
}

// src/components/MedicationSearch/MedicationSearch.tsx
var import_react3 = require("react");

// src/components/MedicationSearch/MedicationSearch.module.css
var MedicationSearch_default = {};

// src/components/MedicationSearch/MedicationSearch.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function MedicationSearch({
  fetchMedications,
  onSelect,
  placeholder = "Search medications\u2026",
  debounceMs = 250
}) {
  const [query, setQuery] = (0, import_react3.useState)("");
  const [results, setResults] = (0, import_react3.useState)([]);
  const [active, setActive] = (0, import_react3.useState)(-1);
  const abortRef = (0, import_react3.useRef)(null);
  const listId = (0, import_react3.useMemo)(() => `mk-med-${Math.random().toString(36).slice(2, 9)}`, []);
  (0, import_react3.useEffect)(() => {
    if (!query.trim()) {
      setResults([]);
      setActive(-1);
      abortRef.current?.abort();
      return;
    }
    const t = setTimeout(async () => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const meds = await fetchMedications(query.trim(), ctrl.signal);
        if (!ctrl.signal.aborted) {
          setResults(meds);
          setActive(meds.length ? 0 : -1);
        }
      } catch (e) {
      }
    }, debounceMs);
    return () => clearTimeout(t);
  }, [query, debounceMs, fetchMedications]);
  function onKeyDown(e) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      onSelect(results[active]);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: MedicationSearch_default.wrap, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: MedicationSearch_default.row, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "input",
      {
        className: MedicationSearch_default.input,
        value: query,
        onChange: (e) => setQuery(e.target.value),
        placeholder,
        "aria-autocomplete": "list",
        "aria-controls": listId,
        onKeyDown
      }
    ) }),
    results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: MedicationSearch_default.list, role: "listbox", id: listId, "aria-label": "medication results", children: results.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "button",
      {
        type: "button",
        className: MedicationSearch_default.item,
        role: "option",
        "aria-selected": idx === active,
        onMouseEnter: () => setActive(idx),
        onClick: () => onSelect(m),
        children: [
          m.name,
          m.strength ? ` \u2014 ${m.strength}` : ""
        ]
      },
      m.id
    )) })
  ] });
}

// src/components/TimeSlotPicker/TimeSlotPicker.tsx
var import_react4 = require("react");

// src/components/TimeSlotPicker/TimeSlotPicker.module.css
var TimeSlotPicker_default = {};

// src/components/TimeSlotPicker/TimeSlotPicker.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function TimeSlotPicker({ dateLabel, slots, value, onChange }) {
  const labelId = (0, import_react4.useMemo)(() => `mk-ts-${Math.random().toString(36).slice(2, 9)}`, []);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: TimeSlotPicker_default.wrap, "aria-labelledby": labelId, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { id: labelId, style: { fontWeight: 700 }, children: [
      "Available slots \u2014 ",
      dateLabel
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: TimeSlotPicker_default.grid, role: "listbox", "aria-label": "time slots", children: slots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "button",
      {
        type: "button",
        className: TimeSlotPicker_default.slot,
        role: "option",
        "aria-selected": value === s.id,
        disabled: !s.available,
        onClick: () => onChange(s.id),
        children: s.label
      },
      s.id
    )) })
  ] });
}

// src/components/DataTable/DataTable.tsx
var import_react5 = require("react");

// src/components/DataTable/DataTable.module.css
var DataTable_default = {};

// src/components/DataTable/DataTable.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function DataTable(props) {
  const totalPages = Math.max(1, Math.ceil(props.totalRows / props.pageSize));
  const sel = props.selectedIds ?? /* @__PURE__ */ new Set();
  const allOnPageIds = (0, import_react5.useMemo)(() => new Set(props.rows.map(props.rowId)), [props.rows, props.rowId]);
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
  function toggleOne(id) {
    const next = new Set(sel);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    props.onSelectionChange?.(next);
  }
  function sortClick(colKey) {
    if (!props.onSortChange) return;
    const current = props.sort;
    if (!current || current.key !== colKey) props.onSortChange({ key: colKey, dir: "asc" });
    else props.onSortChange({ key: colKey, dir: current.dir === "asc" ? "desc" : "asc" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: DataTable_default.wrap, "aria-label": props.ariaLabel ?? "data table", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: DataTable_default.toolbar, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { fontSize: 12, color: "var(--mk-muted)" }, children: [
        "Page ",
        props.page,
        " of ",
        totalPages,
        " \u2022 ",
        props.totalRows,
        " rows"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: DataTable_default.pager, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: DataTable_default.btn, onClick: () => props.onPageChange(1), disabled: props.page <= 1, children: "First" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: DataTable_default.btn, onClick: () => props.onPageChange(props.page - 1), disabled: props.page <= 1, children: "Prev" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: DataTable_default.btn, onClick: () => props.onPageChange(props.page + 1), disabled: props.page >= totalPages, children: "Next" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: DataTable_default.btn, onClick: () => props.onPageChange(totalPages), disabled: props.page >= totalPages, children: "Last" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("table", { className: DataTable_default.table, role: "grid", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { className: DataTable_default.th, style: { width: 42 }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "input",
          {
            type: "checkbox",
            "aria-label": "select all rows on page",
            checked: [...allOnPageIds].length > 0 && [...allOnPageIds].every((id) => sel.has(id)),
            onChange: toggleAll
          }
        ) }),
        props.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("th", { className: DataTable_default.th, style: { width: c.width }, children: c.sortable && props.onSortChange ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("button", { className: DataTable_default.sortBtn, type: "button", onClick: () => sortClick(c.key), "aria-label": `sort by ${c.header}`, children: [
          c.header,
          props.sort?.key === c.key ? props.sort.dir === "asc" ? " \u25B2" : " \u25BC" : ""
        ] }) : c.header }, c.key))
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("tbody", { children: props.rows.map((r) => {
        const id = props.rowId(r);
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("tr", { className: DataTable_default.tr, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { className: DataTable_default.td, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "input",
            {
              type: "checkbox",
              "aria-label": `select row ${id}`,
              checked: sel.has(id),
              onChange: () => toggleOne(id)
            }
          ) }),
          props.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("td", { className: DataTable_default.td, children: c.render(r) }, c.key))
        ] }, id);
      }) })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppointmentCard,
  DataTable,
  MedicationSearch,
  TimeSlotPicker,
  VitalSignsInput
});
//# sourceMappingURL=index.cjs.map