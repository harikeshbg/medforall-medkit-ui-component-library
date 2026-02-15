import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type AppointmentStatus = "confirmed" | "pending" | "cancelled";
interface AppointmentCardProps {
    patientName: string;
    date: string;
    time: string;
    doctor: string;
    type: string;
    status: AppointmentStatus;
    onReschedule?: () => void;
    onCancel?: () => void;
    onViewDetails?: () => void;
}
declare function AppointmentCard(props: AppointmentCardProps): react_jsx_runtime.JSX.Element;

interface VitalSigns {
    heightCm?: number;
    weightKg?: number;
    systolic?: number;
    diastolic?: number;
    temperatureC?: number;
}
interface VitalSignsInputProps {
    value?: VitalSigns;
    onChange: (value: VitalSigns) => void;
}
declare function VitalSignsInput({ value, onChange }: VitalSignsInputProps): react_jsx_runtime.JSX.Element;

interface Medication {
    id: string;
    name: string;
    strength?: string;
}
interface MedicationSearchProps {
    fetchMedications: (query: string, signal: AbortSignal) => Promise<Medication[]>;
    onSelect: (medication: Medication) => void;
    placeholder?: string;
    debounceMs?: number;
}
declare function MedicationSearch({ fetchMedications, onSelect, placeholder, debounceMs }: MedicationSearchProps): react_jsx_runtime.JSX.Element;

interface TimeSlot {
    id: string;
    label: string;
    available: boolean;
}
interface TimeSlotPickerProps {
    dateLabel: string;
    slots: TimeSlot[];
    value?: string;
    onChange: (slotId: string) => void;
}
declare function TimeSlotPicker({ dateLabel, slots, value, onChange }: TimeSlotPickerProps): react_jsx_runtime.JSX.Element;

type SortDir = "asc" | "desc";
interface SortState {
    key: string;
    dir: SortDir;
}
interface ColumnDef<T> {
    key: string;
    header: string;
    width?: number | string;
    sortable?: boolean;
    render: (row: T) => React.ReactNode;
    sortValue?: (row: T) => string | number;
}
interface DataTableProps<T> {
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
declare function DataTable<T>(props: DataTableProps<T>): react_jsx_runtime.JSX.Element;

export { AppointmentCard, type AppointmentCardProps, type AppointmentStatus, type ColumnDef, DataTable, type DataTableProps, type Medication, MedicationSearch, type MedicationSearchProps, type SortDir, type SortState, type TimeSlot, TimeSlotPicker, type TimeSlotPickerProps, type VitalSigns, VitalSignsInput, type VitalSignsInputProps };
