import React from "react";
import { render, screen } from "@testing-library/react";
import { AppointmentCard } from "./AppointmentCard";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";

describe("AppointmentCard", () => {
  it("renders patient name and status", () => {
    render(
      <AppointmentCard
        patientName="Alex"
        date="2026-02-14"
        time="10:30 AM"
        doctor="Dr. Patel"
        type="Follow-up"
        status="confirmed"
      />
    );
    expect(screen.getByText("Alex")).toBeInTheDocument();
    expect(screen.getByText("confirmed")).toBeInTheDocument();
  });

  it("is accessible", async () => {
    const { container } = render(
      <AppointmentCard
        patientName="Alex"
        date="2026-02-14"
        time="10:30 AM"
        doctor="Dr. Patel"
        type="Follow-up"
        status="confirmed"
      />
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);

  });
});
