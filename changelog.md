# Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased] — 2026-02-21

---

### ✅ React Application Foundation

#### Entry Point (`src/main.jsx`)

- Renders the app inside `React.StrictMode`
- Wraps the app with `<BrowserRouter>` from `react-router-dom` for client-side routing

#### Routing (`src/App.jsx`)

- Configured **React Router v7** (`react-router-dom ^7.13.0`) with `<Routes>` / `<Route>`
- Registered routes:
  - `/` → `<LandingPage />` (Olena + Anna)
  - `/materials` → `<MaterialsPage />` (Michael + Tetiana)
  - `*` (catch-all) → `<NotFoundPage />` (404 fallback)
- Pending routes (TODO comments in place):
  - `/lecture/:id` → `<LecturePage />` (Roman) — not yet added
  - `/admin` → `<AdminPage />` (Bohdan) — not yet added

#### Pages (stub components, ready for implementation)

- `src/landing/LandingPage.jsx` — skeleton created
- `src/materials/MaterialsPage.jsx` — skeleton created
- `src/404/NotFoundPage.jsx` — skeleton created (catch-all 404 handler)

#### Styles

- `src/index.css` — default Vite CSS commented out, clean slate ready for custom design system
- `src/App.css` — present, awaiting component-level styles

---

### 📦 Dependencies

| Package                       | Version | Role                      |
| ----------------------------- | ------- | ------------------------- |
| `react`                       | ^19.2.0 | Core UI library           |
| `react-dom`                   | ^19.2.0 | DOM rendering             |
| `react-router-dom`            | ^7.13.0 | Client-side routing       |
| `vite`                        | ^7.3.1  | Build tool / dev server   |
| `@vitejs/plugin-react-swc`    | ^4.2.2  | SWC-based Fast Refresh    |
| `eslint`                      | ^9.39.1 | Linting                   |
| `eslint-plugin-react-hooks`   | ^7.0.1  | Hook rules linting        |
| `eslint-plugin-react-refresh` | ^0.4.24 | HMR-safe exports linting  |
| `@types/react`                | ^19.2.7 | React TypeScript types    |
| `@types/react-dom`            | ^19.2.3 | ReactDOM TypeScript types |

---

### 🗺️ Project Plan (from `todo.md`)

The full feature plan has been documented in `todo.md` and covers:

1. **UX Flows & Pages** — Landing, Materials, Lecture detail, Admin dashboard
2. **Tech Setup** — React + Convex integration plan (Convex not yet installed)
3. **Data Model** — `materials` table schema + search index + `adminSessions` table
4. **Backend API** — Convex query/mutation function signatures (public + admin)
5. **Auth Approach** — Simple admin password login, session token in `localStorage`, server-side validation
6. **Frontend Architecture** — Routing map, shared UI components list, state strategy (live recommendations vs submitted results)
7. **"Google Articles" Block** — Curated links (MVP-A) + generated Google search URLs (MVP-B)
8. **Validation / Loading / Error States** — Non-negotiables defined for all interactions
9. **Milestones** — 6 milestones from skeleton app to polished product

---

## [MaterialsPage UI] — 2026-02-21

### ✅ MaterialsPage — Full UI Implementation (`src/materials/`)

#### Removed: Chakra UI

- Uninstalled `@chakra-ui/react` and `@chakra-ui/icons` (incompatible with Chakra UI v3 + React 19)
- Removed `<ChakraProvider>` wrapper from `src/main.jsx`
- Rebuilt all UI with **Vanilla CSS** — zero UI-library dependencies

#### CSS Architecture (`src/materials/styles/MaterialsPage.css`)

- Established CSS custom properties: `--font`, `--h2`, `--h3`, `--text`
- Typography: **Open Sans** (body) + **Syne** (page title) via Google Fonts
- Implemented `.container` with `max-width: 1440px` and `padding: 0 80px`
- **Button system:**
  - `.button` — base filled pill button with `border: 1px solid transparent` to prevent layout shift on hover
  - `.button.icon` — flex variant with icon + label
  - `.button__mode` — circular icon-only toggle button (44×44px)
  - `.button__mode--active` — selected state modifier (dark background)
  - White SVG arrow recolored to brand orange on hover via CSS `filter`
- **Search input:**
  - `.input__wrapper` — minimal `position: relative; flex: 1` container
  - `.input__wrapper::after` — inline SVG search icon via `content: url()` data URI (no extra HTML element needed)
  - `.input` — owns all visual styles (border, background, padding, border-radius)
  - Focus state: `border-color: #ff3800` only, no box-shadow

#### Component Architecture

- **`MaterialsPage.jsx`** — state owner: holds `listView` boolean, `listLayoutHandler` / `gridLayoutHandler`
- **`Layout.jsx`** (`components/`) — pure presentational component, receives all data via props (Container/Presentational pattern)
- **`SplitText.jsx`** (`custom/`) — custom GSAP text animation component
  - Rewrote without `gsap/SplitText` (premium-only plugin); uses manual React `<span>` splitting + `ScrollTrigger`
  - Supports `chars` / `words` split types, configurable `from`/`to`/`ease`/`delay`/`duration` props

#### Features Implemented

- **Header bar:** result counter + stretching search input + grid/list toggle buttons
- **Grid view** (`.materials__list`): 3-column card grid, `calc((100% - 80px) / 3)` per card
- **List view** (`.materials__list--row`): full-width horizontal cards, thumbnail left (180×120px, `border-radius: 20px 0 0 20px`), content + CTA right
- **View toggle:** grid/list buttons switch `listView` state → container class and card modifier (`--row`) update simultaneously

#### Dependencies Added

| Package       | Version | Role                       |
| ------------- | ------- | -------------------------- |
| `gsap`        | ^3.x    | Animation engine           |
| `@gsap/react` | ^2.x    | `useGSAP` hook integration |

---
