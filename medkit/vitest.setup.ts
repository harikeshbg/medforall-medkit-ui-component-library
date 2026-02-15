import "@testing-library/jest-dom";

// ---- jsdom shims for axe-core ----
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: () => null,
});

const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = ((elt: Element, pseudoElt?: string | null) => {
  try {
    return originalGetComputedStyle(elt, pseudoElt as any);
  } catch {
    return originalGetComputedStyle(elt);
  }
}) as any;
