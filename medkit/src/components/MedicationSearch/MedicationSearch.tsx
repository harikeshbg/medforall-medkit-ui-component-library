import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./MedicationSearch.module.css";

export interface Medication {
  id: string;
  name: string;
  strength?: string;
}

export interface MedicationSearchProps {
  fetchMedications: (query: string, signal: AbortSignal) => Promise<Medication[]>;
  onSelect: (medication: Medication) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function MedicationSearch({
  fetchMedications,
  onSelect,
  placeholder = "Search medications…",
  debounceMs = 250
}: MedicationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Medication[]>([]);
  const [active, setActive] = useState<number>(-1);
  const abortRef = useRef<AbortController | null>(null);

  const listId = useMemo(() => `mk-med-${Math.random().toString(36).slice(2, 9)}`, []);

  useEffect(() => {
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
        // ignore abort
      }
    }, debounceMs);

    return () => clearTimeout(t);
  }, [query, debounceMs, fetchMedications]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      onSelect(results[active]!);
    }
  }

  const isOpen = results.length > 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          onKeyDown={onKeyDown}
        />
      </div>

      {isOpen && (
        <div className={styles.list} role="listbox" id={listId} aria-label="medication results">
          {results.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              className={styles.item}
              role="option"
              aria-selected={idx === active}
              onMouseEnter={() => setActive(idx)}
              onClick={() => onSelect(m)}
            >
              {m.name}
              {m.strength ? ` — ${m.strength}` : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
