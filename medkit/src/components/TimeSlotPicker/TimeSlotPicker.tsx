import React, { useMemo } from "react";
import styles from "./TimeSlotPicker.module.css";

export interface TimeSlot {
  id: string;
  label: string;     // e.g. "10:30 AM"
  available: boolean;
}

export interface TimeSlotPickerProps {
  dateLabel: string;
  slots: TimeSlot[];
  value?: string; // slot id
  onChange: (slotId: string) => void;
}

export function TimeSlotPicker({ dateLabel, slots, value, onChange }: TimeSlotPickerProps) {
  const labelId = useMemo(() => `mk-ts-${Math.random().toString(36).slice(2, 9)}`, []);

  return (
    <div className={styles.wrap} aria-labelledby={labelId}>
      <div id={labelId} style={{ fontWeight: 700 }}>Available slots — {dateLabel}</div>
      <div className={styles.grid} role="listbox" aria-label="time slots">
        {slots.map((s) => (
          <button
            key={s.id}
            type="button"
            className={styles.slot}
            role="option"
            aria-selected={value === s.id}
            disabled={!s.available}
            onClick={() => onChange(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
