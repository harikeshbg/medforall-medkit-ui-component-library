import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AppointmentCard } from "./AppointmentCard";

const meta: Meta<typeof AppointmentCard> = {
  title: "MedKit/AppointmentCard",
  component: AppointmentCard,
  args: {
    patientName: "Alex Johnson",
    date: "2026-02-14",
    time: "10:30 AM",
    doctor: "Dr. Patel",
    type: "Follow-up",
    status: "confirmed"
  }
};

export default meta;
type Story = StoryObj<typeof AppointmentCard>;

export const Default: Story = {};
export const Pending: Story = { args: { status: "pending" } };
export const Cancelled: Story = { args: { status: "cancelled" } };
