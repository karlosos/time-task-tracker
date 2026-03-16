# Project Roadmap: Code Coverage Improvement

Story creation: 2026-03-16
Story status: In planning

This document outlines the strategy for improving the testing coverage of the `time-task-tracker` application. The current overall coverage is ~75%, with several critical modules falling significantly below that.

## 🎯 Coverage Goals

- **Overall Stmts:** 90%+
- **Critical Business Logic:** 100%
- **UI Components:** 80%+

---

## 🛠 Phase 1: Critical Priority (Coverage < 40%)

Focus on core features that are currently largely untested.

### 1. Settings Module (`src/app/features/Settings`)

- **File:** `slice.ts` (Current: 30.55%)
- **Target Areas:** lines 92-99 (`createAndDownloadFile`), 104-112 (`formatDateTime`).
- **Tasks:**
  - [ ] Test all reducers: `patternsChanged`, `setAdjustableTimeReporting`, `setTagPillsVisibility`, `setShiftTimerEnabled`.
  - [ ] Mock `document.createElement` and `URL.createObjectURL` to test the JSON export functionality.
  - [ ] Verify `formatDateTime` generates correct filename strings.

### 2. Time Entry Reporting & Badges (`src/app/features/TimeEntries`)

- **File:** `TimeReportingDialog.tsx` (Current: 16.41%)
- **Target Areas:** lines 26-247 (Almost the entire component).
- **Tasks:**
  - [ ] Test dialog visibility toggles via `isVisible` prop.
  - [ ] Test "30 min" increment/decrement buttons (`round30MinutesUp`/`Down`).
  - [ ] Verify time reporting logic: saving and clearing reported times.
  - [ ] Test the proportional time distribution logic in `useReportedTimeState`.
- **File:** `LoggedTimeBadge.tsx` (Current: 16.12%)
- **Target Areas:** lines 4-44, 79-91.
- **Tasks:**
  - [ ] Test rendering for various `reportedTimePerDay` vs `targetHours` scenarios.
  - [ ] Verify visual states (colors/icons) for under-logging vs over-logging.

---

## 🏗 Phase 2: High Priority (Coverage 40% - 65%)

Focus on data persistence and core state management.

### 3. Storage & Persistence (`src/app/store`)

- **File:** `localStorage.ts` (Current: 50.00%)
- **Target Areas:** lines 21-34 (`JSON.parse` and migrations), 39-41 (`setItem`).
- **Tasks:**
  - [ ] Mock `localStorage` to test read/write failures.
  - [ ] Test state migration logic (e.g., when `featureFlags` are missing).
  - [ ] Verify data serialization/deserialization.

### 4. Time Entries Store (`src/app/features/TimeEntries/store`)

- **File:** `slice.ts` (Current: 59.45%)
- **Target Areas:** lines 92-105, 112, 115.
- **Tasks:**
  - [ ] Test bulk operations and complex state transitions.
- **File:** `selectors.ts` (Current: 64.78%)
- **Target Areas:** lines 48-50, 59-77, 81-97.
- **Tasks:**
  - [ ] Test `selectTimeEntriesGroupedByDate` with various inputs.
  - [ ] Verify memoization behavior for filtered results.

---

## 🧹 Phase 3: Medium Priority (Coverage 65% - 80%)

Polishing helpers, hooks, and list views.

### 5. List View & Pagination (`src/app/features/TimeEntries/TimeEntriesList`)

- **File:** `TimeEntriesList.tsx` (Current: 89.79%)
- **Target Areas:** lines 84 (`DayHeader` expanded), 124 (`handleLoadMore`), 128 (`handleLoadAll`).
- **Tasks:**
  - [ ] Test "Load More" and "Load All" button clicks.
  - [ ] Verify `DayHeader` rendering when `isAdjustableTimeReportingEnabled` is toggled.

### 6. Utility Functions & Hooks

- **File:** `src/app/utils.ts` (Current: 63.63%)
- **Tasks:**
  - [ ] Test specialized date formatting and time parsing helpers.
- **File:** `useCopyToClipboard.ts` (Current: 70.58%)
- **Tasks:**
  - [ ] Mock Clipboard API success and failure paths.

### 7. Timer Logic (`src/app/features/Timer`)

- **File:** `slice.ts` (Current: 73.17%)
- **Tasks:**
  - [ ] Test timer expiration and preset selection effects.

---

## 📊 Summary of Targeted Scenarios

| Area               | Key Scenarios to Test                                    |
| :----------------- | :------------------------------------------------------- |
| **Time Reporting** | Proportional splitting of time, 30min rounding logic.    |
| **Settings**       | Data export/import, feature flag toggling.               |
| **Persistence**    | Data migration from old formats, storage quota exceeded. |
| **Pagination**     | Handling large lists of entries efficiently.             |
