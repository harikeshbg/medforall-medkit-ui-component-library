import React, { useEffect, useRef, useState } from "react";
import styles from "./AppointmentCard.module.css";

export type AppointmentStatus = "confirmed" | "pending" | "cancelled";

export interface AppointmentCardProps {
  patientName: string;
  date: string; // ISO or display; library keeps as string
  time: string;
  doctor: string;
  type: string;
  status: AppointmentStatus;
  onReschedule?: () => void;
  onCancel?: () => void;
  onViewDetails?: () => void;
}

function badgeClass(status: AppointmentStatus): string {
  if (status === "confirmed") return `${styles.badge} ${styles.badgeConfirmed}`;
  if (status === "pending") return `${styles.badge} ${styles.badgePending}`;
  return `${styles.badge} ${styles.badgeCancelled}`;
}

export function AppointmentCard(props: AppointmentCardProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(t)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <section className={styles.card} aria-label={`Appointment for ${props.patientName}`}>
      <div className={styles.top}>
        <div>
          <h3 className={styles.title}>{props.patientName}</h3>
          <div className={styles.meta}>
            <span aria-label="date">{props.date}</span>
            <span aria-label="time">{props.time}</span>
            <span aria-label="doctor">{props.doctor}</span>
            <span aria-label="type">{props.type}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <span className={badgeClass(props.status)} aria-label={`status ${props.status}`}>
            {props.status}
          </span>

          <div className={styles.menu} ref={menuRef}>
            <button
              type="button"
              className={styles.button}
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              Actions
            </button>
            {open && (
              <div className={styles.menuList} role="menu" aria-label="appointment actions">
                <button className={styles.menuItem} role="menuitem" onClick={() => { setOpen(false); props.onViewDetails?.(); }}>
                  View details
                </button>
                <button className={styles.menuItem} role="menuitem" onClick={() => { setOpen(false); props.onReschedule?.(); }}>
                  Reschedule
                </button>
                <button className={styles.menuItem} role="menuitem" onClick={() => { setOpen(false); props.onCancel?.(); }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
