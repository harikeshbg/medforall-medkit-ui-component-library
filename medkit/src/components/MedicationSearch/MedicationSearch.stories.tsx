import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { MedicationSearch, type Medication } from "./MedicationSearch";

const meta: Meta<typeof MedicationSearch> = {
  title: "MedKit/MedicationSearch",
  component: MedicationSearch
};
export default meta;
type Story = StoryObj<typeof MedicationSearch>;

const MOCK: Medication[] = [
  { id: "1", name: "Amoxicillin", strength: "500mg" },
  { id: "2", name: "Atorvastatin", strength: "10mg" },
  { id: "3", name: "Metformin", strength: "500mg" },
  { id: "4", name: "Ibuprofen", strength: "200mg" }
];

export const Default: Story = {
  render: () => {
    const [picked, setPicked] = useState<string>("None");
    return (
      <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <MedicationSearch
          fetchMedications={async (q, signal) => {
            await new Promise((r) => setTimeout(r, 200));
            if (signal.aborted) throw new Error("aborted");
            const qq = q.toLowerCase();
            return MOCK.filter((m) => m.name.toLowerCase().includes(qq));
          }}
          onSelect={(m) => setPicked(`${m.name} ${m.strength ?? ""}`.trim())}
        />
        <div><b>Selected:</b> {picked}</div>
      </div>
    );
  }
};
