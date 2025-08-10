# PROJECT\_PLAN.md

## App Goal & Scope

A minimal, offline-first **iPhone PWA** to run the *Minimalift 3‑Day* strength program. The app must:

- Show the day’s workout and exercise details.
- Run accurate, hands-free timers (EMOM/E4MOM/N90/rest) with haptics/audio.
- Log sets (weight/reps/notes), remember last session numbers, and surface simple progress.
- Open concise exercise videos inline.
- Work fully in airplane mode after first load.

**Non‑goals (v1):** accounts, social, cloud sync, complex analytics, leaderboards.

---

## Core User Stories (MVP)

1. **Browse Program**: As a user, I can pick **Day 1/2/3** and see the sequence: Warm‑up → Strength & Condition (EMOM/E4MOM/N90) → Swole & Flexy → Accessories.
2. **Start Session**: I can start a session; the app guides me exercise‑by‑exercise with timers, set counters, and clear next‑up preview.
3. **Timers**: I can run:
   - **EMOM/E2MOM/E4MOM** blocks with round count, remaining time, and auto‑advance.
   - **N90** (every 90s for 5 sets) blocks.
   - **Fixed rest** timers (e.g., 60s) and **timed circuits**.
   - Optional vibration/sound at period changes.
4. **Log**: For each set I can quickly enter weight, reps, and an optional note; the app pre‑fills from last session.
5. **Videos**: I can tap a compact thumbnail to watch an exercise demo (YouTube/Vimeo/mp4). Open in‑app player with picture‑in‑picture where available.
6. **Substitutions**: I can tap to swap to one of the prescribed substitutes per exercise.
7. **History & Progress**: I can view last **3** sessions per exercise and see my latest **top set** weight highlighted.
8. **Offline‑first**: Once installed, everything except streaming videos works offline. Previously watched videos are remembered as links; no heavy caching.
9. **Settings**: KG/LB toggle, sound on/off, haptics on/off, light/dark (system default), confirm exit during an active timer.

---

## Data Model (IndexedDB)

Single DB: `minimalift_v1` with stores & indexes. Keep schema tiny and append‑only where possible.

- **stores.programs** (key = `programId`)
  - `programId` ("minimalift\_3day")
  - `title`, `phases[]` (metadata only)
- **stores.days** (key = `dayId`, index: `programId`)
  - `dayId` (e.g., `p1_w1_d1`), `programId`, `title`, `order` (1|2|3), `blocks[]`
- **Block** (embedded in day)
  - `type`: `warmup` | `strength` | `swole` | `accessory`
  - `timerMode`: `none` | `emom` | `e4mom` | `n90` | `fixed_rest` | `timed_circuit`
  - `durationSec` (period length for emom/e4mom/n90), `rounds` (e.g., 6), `notes`
  - `exercises[]` (usually 1–2 for paired EMOM blocks)
- **Exercise (embedded)**
  - `id`, `name`, `sets` (number) | `reps` (string like "5" or "8–12 e/s"), `restSec` (optional)
  - `substitutes[]` (ids or labels), `videoUrls[]`, `cues` (short note)
- **stores.sessions** (key = auto, index: `dayId`, `date`)
  - `sessionId`, `dayId`, `startedAt`, `completedAt`, `settingsSnapshot`
  - `entries[]`
- **Entry** (embedded per exercise set)
  - `exerciseId`, `setNumber`, `weight`, `reps`, `rpe?`, `note?`, `timerRound?`

**Seed content**: load the program days/blocks from a small JSON derived from the PDF so the app logic doesn’t hardcode timings. (Keep assets under \~50KB.)

---

## Tech Stack (ultra‑light)

- **Language**: Vanilla **TypeScript** (no framework).
- **Build**: **Vite** for fast dev/build (esbuild/rollup). No UI libs.
- **UI**: Native Web Components + minimal CSS (system font stack). Zero runtime deps.
- **Storage**: **IndexedDB** via a \~100–150 line helper (promisified wrapper). No Dexie/localForage.
- **PWA**: `manifest.webmanifest` + **hand‑rolled service worker** (cache‑first for shell & JSON; network‑only for videos).
- **Timers**: `setInterval` + monotonic drift correction; `VisibilityChange` handling; `Navigator.wakeLock` if available.
- **Haptics/Audio**: iOS Vibration API (simple), short WebAudio beep.
- **Testing**: Playwright (e2e, headless webkit) + a few unit tests with Vitest.

---

## File/Folder Layout

```
/ (repo)
  index.html
  /src
    main.ts
    router.ts (hash‑based)
    idb.ts (tiny wrapper)
    program.ts (seed JSON import + types)
    timers/
      emom.ts  (periodic timer w/ drift correction)
      n90.ts
      fixedRest.ts
    ui/
      app-shell.ts        (component)
      view-day.ts         (list of blocks)
      view-session.ts     (guided flow)
      set-input.ts        (weight/reps quick input)
      video-thumb.ts      (opens player)
      toast.ts            (tiny notifications)
    sw.ts                 (service worker)
    styles.css
  manifest.webmanifest
  /public/icons (PWA icons, apple-touch-icon)
```

---

## Execution Plan (for an AI builder)

**Phase 0 — Project Skeleton (½ day)**

1. Init Vite (vanilla-ts). Add TS strict, ESLint.
2. Add `manifest.webmanifest` and icons. `display: "standalone"`, `theme_color`, `background_color`.
3. Create `app-shell.ts` with header (Day picker, Settings), content outlet, and bottom sticky timer bar.

**Phase 1 — Data & Program (½–1 day)** 4. Implement `idb.ts` wrapper with: `openDb()`, `tx(store, mode)`, `get/put/indexGetAll`. 5. Define `types.ts` for Program/Day/Block/Exercise/Session/Entry. 6. Import seed JSON (`program.ts`) covering D1/D2/D3 across phases with correct timer modes. 7. Build `view-day.ts` to render blocks + substitute chips + video thumbs.

**Phase 2 — Timers & Session Flow (1–2 days)** 8. Implement timer engine with **drift correction**: keep `startEpoch`, compute `elapsed = now - startEpoch`, derive `remaining = period - (elapsed % period)`. 9. Build **EMOM/E4MOM** and **N90** helpers; add **Fixed Rest** + **Timed Circuit**. 10. Create `view-session.ts`: - Start/Pause/Reset, round counter, period countdown, next‑up preview. - Auto‑advance within block; manual override allowed. - Haptic/audio cues at 3–2–1 and period end. 11. Add **Wake Lock** (if available) and fallback: keep‑alive via minimal activity; pause timers on tab hidden; warn user to disable Auto‑Lock for long sessions.

**Phase 3 — Logging & History (1 day)** 12. `set-input.ts`: numeric weight/reps pads; prefill from last session (lookup by `exerciseId`). 13. On save: append `Entry` into `sessions` record; compute and flag **top set** per exercise for that session. 14. Simple history drawer (last 3 entries) on exercise card.

**Phase 4 — Videos & Polish (½ day)** 15. `video-thumb.ts` opens a light inline player; fallback to system handler if embedded playback blocked. 16. Add Settings: unit toggle, haptics/audio toggles. 17. Add install prompt (iOS add‑to‑home instructions) and offline banner.

**Phase 5 — PWA & Tests (½ day)** 18. Implement `sw.ts`: precache shell & seed JSON; runtime cache of images; bypass for video domains. 19. Write e2e tests for: timer accuracy over 10 min, pause/resume, EMOM round counts, logging flow, offline load. 20. Lighthouse pass (PWA installable, perf > 90 on mobile).

---

## Key UX Details

- **One‑thumb operation**: big Start/Pause; weight keypad at bottom; swipe left/right to move sets.
- **Always‑visible timer bar** with remaining time + round x/y.
- **Substitutions** presented as small chips under the exercise; tap to swap.
- **Color states**: upcoming (muted), active (bold), completed (dim w/ check).
- **Error‑proofing**: confirmation on exit when timer/session active.

---

## Seed JSON Shape (example)

```json
{
  "programId": "minimalift_3day",
  "days": [
    {
      "dayId": "p1_w1_d1",
      "title": "Phase 1 • Week 1 • Day 1",
      "blocks": [
        {"type":"warmup","timerMode":"none","exercises":[{"name":"Pogos","sets":3,"reps":"20"}]},
        {"type":"strength","timerMode":"emom","durationSec":120,"rounds":6,
         "exercises":[{"name":"Barbell Squat","sets":6,"reps":"5"},{"name":"Z‑Press","sets":6,"reps":"5"}]},
        {"type":"swole","timerMode":"none","exercises":[{"name":"Dumbbell Press","sets":1,"reps":"6–10"}]},
        {"type":"accessory","timerMode":"fixed_rest","durationSec":60,
         "exercises":[{"name":"Dumbbell RDL","sets":1,"reps":"6–10"}]}
      ]
    }
  ]
}
```

---

## Acceptance Criteria (MVP)

- EMOM/E4MOM/N90 timers remain within ±250ms over 12 minutes on iPhone 14+ when screen active.
- Completing a session persists all entries; reopening shows them offline.
- Last weights/reps auto‑populate on next run; KG/LB switch updates displays.
- PWA is installable on iOS (icon, name, splash), loads offline (flight mode test), and resumes an active session after accidental refresh.

---

## Backlog (defer)

- iCloud/Google Drive export‑import (JSON), cloud sync.
- Custom workouts, RPE and %1RM guidance, charts.
- Media prefetch for a small subset of mp4 demos (if licensing allows).

