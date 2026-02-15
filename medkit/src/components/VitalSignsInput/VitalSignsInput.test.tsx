import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { VitalSignsInput } from "./VitalSignsInput";

describe("VitalSignsInput", () => {
  it("is accessible", async () => {
    const { container } = render(<VitalSignsInput value={{ heightCm: 175, weightKg: 72 }} onChange={() => {}} />);
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);

  });
});
