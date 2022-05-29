# Kanban board

## Doing ⌚

### [TTT-1] Move store into redux 

Use redux toolkit for storing data. Create selectors for combined time entries etc. Use memoization (reselect).

- [x] Connect dummy redux store
- [ ] Port existing useTasks into redux
- [ ] Test existing functionality given some mocked store

## To Do ✅

Last id: TTT-7

### [TTT-2] Preload store from the localstorage

Populate redux store from local storage. Save the data from the store to localstorage.

### [TTT-7] Editing existing time entry 

As a user I would want to edit existing time entry. For example edit starting time for currently running time entry or edit starting time/stopped time for existing time entries.

### [TTT-3] Add links to Jira on task id

Recognize Jira task id (DX1-DDDD) and transform them into links. Keep in mind that task id can have other number of digits, e.g. DX1-21, DX1-2, DX1-3312, etc. Assume max number of digits to 5. For a started Jira instance url can be hardcoded. Preferably use regex patterns for that. In [TTT-4] user will be able to customize those links and patterns.

### [TTT-4] Customize Jira link instance and task pattern

Create a settings view where use can customize link to Jira instance and task pattern, e.g. not "DX1-2131" but "UTF-1231". Preferably use regex patterns for that.

### [TTT-5] Prepare CI/CD pipelines

- [ ] code coverage
- [ ] code linting/formatting check on CI/CD
- [ ] code linting/formatting on commit
- [ ] updating README

### [TTT-6] Application redesign

Create new design for existing components. Move some of them into storybook. 

- [ ] Prepare UI Specification
- [ ] Update components

## Done 🏆 


