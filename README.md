# MedKit — Assignment 1 (Component Library)

A small, production-style React + TypeScript component library built for the MedForAll take-home evaluation (Assignment 1). It includes reusable UI components, Storybook documentation, unit tests with React Testing Library + Vitest, and accessibility checks using `axe` (via `vitest-axe`).

## What’s inside

### Components
Located under `src/components/*`:

- `AppointmentCard` — summary card for an appointment/patient status
- `DataTable` — generic, paginated table component
- `MedicationSearch` — debounced medication search with keyboard navigation + listbox pattern
- `TimeSlotPicker` — select an available appointment slot
- `VitalSignsInput` — capture vitals (height/weight/etc.)

### Tooling
- **Build**: `tsup` (ESM + CJS + DTS)
- **Tests**: `vitest` + `@testing-library/react` + `@testing-library/user-event`
- **A11y tests**: `vitest-axe`
- **Docs / Playground**: Storybook
- **Styling**: CSS Modules

---

## Requirements

- Node.js 18+ recommended (Node 20 is fine)
- npm 9+ / 10+

Check versions:
```bash
node -v
npm -v
```

---

## Setup

Install dependencies:
```bash
npm install
```

---

## View the components

This repo is a **component library**, not a standalone app by default.  
To view and interact with components, run **Storybook**.

```bash
npm run storybook
```

Open the URL shown in the terminal (typically `http://localhost:6006`).

---

## Commands

### Run tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Build the library
```bash
npm run build
```

Build outputs:
- `dist/index.js` (ESM)
- `dist/index.cjs` (CJS)
- `dist/index.d.ts` (types)
- `dist/index.css` (styles)

### Lint
```bash
npm run lint
```

---

## Using the library (consumer example)

After building, consumers can import exported components from the package entry:

```tsx
import { AppointmentCard, MedicationSearch } from "medkit";
import "medkit/dist/index.css";
```

(Exact import path depends on how `package.json` exports are configured.)

---

## Accessibility approach

- Components follow basic ARIA patterns where relevant (e.g., combobox/listbox/option for search results).
- A11y tests run with `axe` in Vitest.
- In jsdom, some browser APIs are missing; the repo includes small test-environment shims to avoid false failures.

---

## Repo structure (typical)

```
src/
  components/
    AppointmentCard/
    DataTable/
    MedicationSearch/
    TimeSlotPicker/
    VitalSignsInput/
  index.ts
.storybook/
dist/              (generated after build)
vitest.setup.ts
vitest.config.ts
tsup.config.ts
```
