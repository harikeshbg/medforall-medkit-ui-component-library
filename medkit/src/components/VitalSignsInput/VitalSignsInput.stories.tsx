import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { VitalSignsInput, type VitalSigns } from "./VitalSignsInput";

const meta: Meta<typeof VitalSignsInput> = {
  title: "MedKit/VitalSignsInput",
  component: VitalSignsInput
};
export default meta;
type Story = StoryObj<typeof VitalSignsInput>;

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<VitalSigns>({ heightCm: 175, weightKg: 72, systolic: 120, diastolic: 80, temperatureC: 36.8 });
    return <div style={{ maxWidth: 680 }}><VitalSignsInput value={value} onChange={setValue} /></div>;
  }
};
