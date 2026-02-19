# 1) UX flows and pages

### Landing `/`

**Goal:** explain value + push users to the library

* Hero (headline + short subtitle)
* Benefits (3–6 cards)
* How it works (3 steps)
* Primary CTA button: **“Find a lecture”** → navigates to `/materials`

### Materials `/materials`

**Goal:** search + browse + live recommendations

* Search input (topic)
* **Live “Best matches” recommendation block** updates as user types
* On submit:
  * show **loading state**
  * show **results grid** (materials matching the submitted topic)
  * show **error state** if the request fails
* Optional advanced filters (MVP-friendly):
  * status: Published only
  * type (video/article/slides)
  * level (beginner/intermediate/advanced)
  * tag chips

### Lecture details `/lecture/:id`

**Goal:** consume the selected lecture

* Title, summary, tags, level, type, duration
* “Open material” link (video/article/slides URL)
* “Related materials” (based on tags + title/topic)
* “Google articles” block:
  * curated links stored with the material **and/or**
  * generated Google search links for deeper reading (no external API required)

### Admin dashboard `/admin`

**Goal:** manage materials (protected)

* If not authenticated → show admin login (password)
* If authenticated:
  * list + search
  * status + last updated
  * add new material
  * edit material
  * add/remove tags
  * publish/unpublish

---

## 2) Tech setup (React + Convex)

### Project bootstrap

* Create React app (Vite + TS)
* Install Convex
* Run `npx convex dev` to create/sync a dev deployment and generate the `api` client (Convex quickstart flow). ([Convex Developer Hub](https://docs.convex.dev/quickstart/react?utm_source=chatgpt.com "React Quickstart"))

### Frontend ↔ backend wiring

* Wrap app in `<ConvexProvider>` and use `useQuery` / `useMutation` hooks to read/write data. ([Convex Developer Hub](https://docs.convex.dev/api/modules/react "Module: react | Convex Developer Hub"))

---

## 3) Data model (Convex schema)

### `materials` table (core)

Recommended fields (keep it simple, but future-proof):

* `title: string`
* `summary: string`
* `contentUrl: string` (video/article/slides link)
* `type: "video" | "article" | "slides" | "pdf" | "other"`
* `level: "beginner" | "intermediate" | "advanced"`
* `durationMin?: number`
* `tags: string[]`
* `status: "draft" | "published"`
* `updatedAt: number` (Date.now())
* `searchText: string`
  A single “search field to rule them all”: `${title} ${summary} ${tags.join(" ")} ...` (so search can match across multiple fields). ([Convex](https://www.convex.dev/can-do/search?utm_source=chatgpt.com "Full-text search: Convex can do that"))
* `externalLinks?: { title: string; url: string }[]` (curated Google-reading links)

**Indexes**

* Search index for full-text search:
  * `materials.searchIndex("search_materials", { searchField: "searchText", filterFields: ["status"] })` ([Convex Developer Hub](https://docs.convex.dev/search/text-search "Full Text Search | Convex Developer Hub"))
* Normal indexes for admin sorting / filtering (examples):
  * by `status`
  * by `updatedAt`
  * by `(status, updatedAt)`

### `adminSessions` table (auth)

* `token: string`
* `createdAt: number`
* `expiresAt: number`

*(Optional)* `searchLogs` table (nice-to-have)

* store searches to later build “trending topics” or improve recommendations.

---

## 4) Backend API design (Convex functions)

Convex search queries are done via `withSearchIndex` on a search index. ([Convex Developer Hub](https://docs.convex.dev/search/text-search "Full Text Search | Convex Developer Hub"))

### Public queries (visitor)

1. `materials.recommend({ q, limit })`

* Used by the **live recommendation** block
* For typeahead UX: Convex search supports as-you-type behavior (prefix matching on last term). ([Convex Developer Hub](https://docs.convex.dev/search/text-search "Full Text Search | Convex Developer Hub"))
* Implementation idea:
  * if `q` empty → return `[]`
  * else `.withSearchIndex("search_materials", (s) => s.search("searchText", q).eq("status","published")).take(limit)`

2. `materials.search({ q, limit, filters... })`

* Used for “submitted” results list
* If `q` empty → show latest published materials
* Else full-text search via `withSearchIndex(...)`

3. `materials.getById({ id })`

* Returns full detail record

4. `materials.related({ id, qOrTags })`

* Simple approach:
  * use tags overlap (small dataset: filter in code)
  * or run another search using title/tags as query and exclude the current material

### Admin auth functions

5. `admin.login({ password }) -> { token }`

* Compares password with a secret stored in Convex env var (so it’s not hardcoded in the client)
* Creates `adminSessions` row with `expiresAt`
* Returns token → stored in `localStorage`

6. `admin.validate({ token }) -> { ok }`

* Checks session exists and not expired

7. `admin.logout({ token })`

* Deletes/invalidates session

### Admin material management (all protected server-side)

Every admin mutation/query should:

* accept `token`
* validate session before proceeding (don’t rely on client-only route protection)

8. `admin.listMaterials({ token, q })`
9. `admin.upsertMaterial({ token, fields... })`
10. `admin.patchMaterial({ token, id, patch })`
11. `admin.setStatus({ token, id, status })`
12. `admin.addTag({ token, id, tag })` / `admin.removeTag(...)`
13. `admin.deleteMaterial({ token, id })`

---

## 5) Auth approach (simple, localStorage, no third-party libs)

### What you’ll implement

* A single **admin password login**
* On success:
  * backend returns a **session token**
  * frontend stores it in `localStorage`
* `/admin` is protected:
  * Client-side: route guard checks token exists → otherwise show login
  * Server-side: Convex functions validate token in `adminSessions` before any admin operation

This stays “simple pass with local storage”, while still preventing unauthorized writes at the backend level. The idea of persisting a session identifier in browser storage is a common pattern (even for anonymous sessions). ([Stack](https://stack.convex.dev/anonymous-users-via-sessions "Anonymous Users via Sessions"))

---

## 6) Frontend architecture (React)

### Routing

Use React Router (or any simple router):

* `/` → `LandingPage  (Olena + Anna)`
* `/materials` → `MaterialsPage (Michael + Tetiana)`
* `/lecture/:id` → `LecturePage (Roman)`
* `/admin` → `AdminPage` (includes login fallback) (Bohdan)

### Shared UI components (small design system)

* `Button`, `Input`, `Select`, `Badge/Tag`, `Card`, `Skeleton`, `Spinner`
* `ErrorBanner` (with retry)
* `EmptyState`

### State strategy

* **Live recommendation** : `useQuery(...)` with the current input value.
* When input is empty, disable the query using `"skip"` (Convex supports skipping queries cleanly). ([Convex Developer Hub](https://docs.convex.dev/client/react "Convex React | Convex Developer Hub"))
* **Submitted results** : use a **one-off query call** on submit so you can explicitly manage:
* `isSubmitting`
* `error`
* `results`
  Convex supports one-off querying via the client (handy for “submit → fetch” flows). ([Convex Developer Hub](https://docs.convex.dev/client/react "Convex React | Convex Developer Hub"))

### Materials page behavior (exactly what you requested)

1. User types a topic
2. Recommendation block updates live:
   * show top 5 matches + quick “Open” actions
3. User presses submit
4. UI shows loading state while fetching results
5. Results grid renders
6. If error: show clear error state + retry button

---

## 7) “Google articles related to topic” (within constraints)

Since you’re not adding external APIs, do this in a clean MVP way:

### MVP option A (curated)

* Admin adds `externalLinks[]` to each lecture (best quality)
* Lecture page shows them as “Recommended reading”

### MVP option B (generated Google search links)

* For a topic like `react hooks`, generate links like:
  * `react hooks beginner guide`
  * `react hooks useMemo useCallback`
  * `react hooks common mistakes`
* Render them as Google search URLs (no scraping, no API keys)

You can do A + B together:

* show curated links first
* then “More reading on Google” links

---

## 8) Validation, loading, and error states (non-negotiables)

### Frontend validation

* Add/edit material:
  * required: title, summary, contentUrl, status
  * tags optional but recommended
* Search submit:
  * if empty input, either block submit or show “Popular / latest” instead

### Loading states

* Live recommendation:
  * while `useQuery` returns `undefined`, show skeleton rows
* Submit search:
  * disable submit, show spinner, keep input editable if you want
* Admin mutations:
  * disable buttons while saving/publishing

### Error states

* Use a consistent `ErrorBanner` component:
  * short message
  * “Retry” action
* Admin forms:
  * show inline error under the form (and keep unsaved inputs)

---

## 9) Milestones (build order)

### Milestone 1 — Skeleton app + routing

* Vite React app
* Convex connected (`ConvexProvider`)
* Basic pages + navigation

### Milestone 2 — Database + search

* `materials` schema + search index ([Convex Developer Hub](https://docs.convex.dev/search/text-search "Full Text Search | Convex Developer Hub"))
* `materials.search` + `materials.recommend` using `withSearchIndex` ([Convex Developer Hub](https://docs.convex.dev/search/text-search "Full Text Search | Convex Developer Hub"))
* `/materials` page with:
  * live recommendations
  * submit → results grid with loading/error

### Milestone 3 — Lecture details

* `/lecture/:id` page
* related materials
* google reading block (curated + generated)

### Milestone 4 — Admin auth + protection

* `adminSessions` table
* `admin.login/validate/logout`
* Protect all admin functions server-side

### Milestone 5 — Admin dashboard CRUD

* List + search + status + last updated
* Add new material
* Edit material + tags
* Publish/unpublish

### Milestone 6 — Polish

* responsive layout
* consistent spacing, cards, shadows, typography
* empty states + skeletons
* (optional) seed/import sample materials

---

If you want, I can turn this plan into:

1. a **SPEC.md** (requirements + acceptance criteria), and
2. the **full folder structure + Convex schema/functions checklist** (so you can implement it almost copy/paste).
