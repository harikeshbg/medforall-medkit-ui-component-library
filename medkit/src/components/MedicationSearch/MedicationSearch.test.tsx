import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { MedicationSearch } from "./MedicationSearch";

describe("MedicationSearch", () => {
  it("shows results and selects an item", async () => {
    const user = userEvent.setup();

    const fetchMedications = vi.fn(async (q: string) => {
      if (q.toLowerCase().includes("ibu")) {
        return [{ id: "1", name: "Ibuprofen", strength: "200 mg" }];
      }
      return [];
    });

    const onSelect = vi.fn();

    render(<MedicationSearch fetchMedications={fetchMedications} onSelect={onSelect} />);

    await user.type(screen.getByRole("combobox"), "ibu");

    const opt = await screen.findByRole("option", { name: /Ibuprofen/i });
    await user.click(opt);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1", name: "Ibuprofen" })
    );
  });

  it("is accessible", async () => {
    const fetchMedications = vi.fn(async () => []);
    const { container } = render(<MedicationSearch fetchMedications={fetchMedications} onSelect={() => {}} />);

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });

    expect(results.violations).toEqual([]);
  });
});
