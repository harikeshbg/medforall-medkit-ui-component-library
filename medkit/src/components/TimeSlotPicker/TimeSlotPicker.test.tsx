import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { axe } from "vitest-axe";
import { TimeSlotPicker } from "./TimeSlotPicker";

describe("TimeSlotPicker", () => {
  it("calls onChange when an available slot is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <TimeSlotPicker
        dateLabel="Feb 14, 2026"
        value={undefined}
        onChange={onChange}
        slots={[
          { id: "a", label: "10:00 AM", available: true },
          { id: "b", label: "10:30 AM", available: false }
        ]}
      />
    );

    await user.click(screen.getByRole("option", { name: "10:00 AM" }));
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("is accessible", async () => {
    const { container } = render(
      <TimeSlotPicker
        dateLabel="Feb 14, 2026"
        value={"a"}
        onChange={() => {}}
        slots={[{ id: "a", label: "10:00 AM", available: true }]}
      />
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);

  });
});
