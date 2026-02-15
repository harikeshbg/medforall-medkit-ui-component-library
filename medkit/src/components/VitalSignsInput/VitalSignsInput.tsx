import React, { useMemo, useState } from "react";
import styles from "./VitalSignsInput.module.css";

export interface VitalSigns {
  heightCm?: number;
  weightKg?: number;
  systolic?: number;
  diastolic?: number;
  temperatureC?: number;
}

export interface VitalSignsInputProps {
  value?: VitalSigns;
  onChange: (value: VitalSigns) => void;
}

function clampNum(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function VitalSignsInput({ value, onChange }: VitalSignsInputProps) {
  const v = value ?? {};
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const bmi = useMemo(() => {
    if (!v.heightCm || !v.weightKg) return undefined;
    const h = v.heightCm / 100;
    return v.weightKg / (h * h);
  }, [v.heightCm, v.weightKg]);

  function set<K extends keyof VitalSigns>(key: K, raw: string, min: number, max: number) {
    const num = raw.trim() === "" ? undefined : Number(raw);
    const next: VitalSigns = { ...v };

    if (num === undefined || Number.isNaN(num)) {
      delete next[key];
      onChange(next);
      return;
    }

    next[key] = clampNum(num, min, max) as any;
    onChange(next);
  }

  const errors: Record<string, string | undefined> = {
    bp: v.systolic && v.diastolic && v.systolic <= v.diastolic ? "Systolic must be greater than diastolic." : undefined
  };

  return (
    <div className={styles.wrap} aria-label="vital signs input">
      <div className={styles.grid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="mk-height">Height (cm)</label>
          <input
            id="mk-height"
            className={styles.input}
            inputMode="decimal"
            value={v.heightCm ?? ""}
            onBlur={() => setTouched((x) => ({ ...x, heightCm: true }))}
            onChange={(e) => set("heightCm", e.target.value, 30, 250)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="mk-weight">Weight (kg)</label>
          <input
            id="mk-weight"
            className={styles.input}
            inputMode="decimal"
            value={v.weightKg ?? ""}
            onBlur={() => setTouched((x) => ({ ...x, weightKg: true }))}
            onChange={(e) => set("weightKg", e.target.value, 2, 400)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="mk-sys">Blood pressure (systolic)</label>
          <input
            id="mk-sys"
            className={styles.input}
            inputMode="numeric"
            value={v.systolic ?? ""}
            onBlur={() => setTouched((x) => ({ ...x, bp: true }))}
            onChange={(e) => set("systolic", e.target.value, 60, 250)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="mk-dia">Blood pressure (diastolic)</label>
          <input
            id="mk-dia"
            className={styles.input}
            inputMode="numeric"
            value={v.diastolic ?? ""}
            onBlur={() => setTouched((x) => ({ ...x, bp: true }))}
            onChange={(e) => set("diastolic", e.target.value, 40, 180)}
          />
          {touched.bp && errors.bp && <div className={styles.error}>{errors.bp}</div>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="mk-temp">Temperature (°C)</label>
          <input
            id="mk-temp"
            className={styles.input}
            inputMode="decimal"
            value={v.temperatureC ?? ""}
            onChange={(e) => set("temperatureC", e.target.value, 30, 43)}
          />
        </div>
      </div>

      <div className={styles.summary} aria-label="computed summary">
        <div><b>BMI:</b> {bmi ? bmi.toFixed(1) : "—"}</div>
      </div>
    </div>
  );
}
