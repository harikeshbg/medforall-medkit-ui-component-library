import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { TimeSlotPicker, type TimeSlot } from "./TimeSlotPicker";

const slots: TimeSlot[] = [
  { id: "1", label: "09:00 AM", available: true },
  { id: "2", label: "09:30 AM", available: false },
  { id: "3", label: "10:00 AM", available: true },
  { id: "4", label: "10:30 AM", available: true },
  { id: "5", label: "11:00 AM", available: true },
  { id: "6", label: "11:30 AM", available: false }
];

const meta: Meta<typeof TimeSlotPicker> = {
  title: "MedKit/TimeSlotPicker",
  component: TimeSlotPicker
};
export default meta;
type Story = StoryObj<typeof TimeSlotPicker>;

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>("3");
    return <TimeSlotPicker dateLabel="Feb 14, 2026" slots={slots} value={value} onChange={setValue} />;
  }
};
