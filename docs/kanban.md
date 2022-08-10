# Kanban board

## Doing ⌚

### Testing

Test existing functionality given some mocked store

## To Do ✅

### Use memoization (reselect) in selectors

Use memoization in some selectors where we create new data objects.

### Add links to Jira on task id

Recognize Jira task id (DX1-DDDD) and transform them into links. Keep in mind that task id can have other number of digits, e.g. DX1-21, DX1-2, DX1-3312, etc. Assume max number of digits to 5. For a started Jira instance url can be hardcoded. Preferably use regex patterns for that. In [TTT-4] user will be able to customize those links and patterns.

### Customize Jira link instance and task pattern

Create a settings view where use can customize link to Jira instance and task pattern, e.g. not "DX1-2131" but "UTF-1231". Preferably use regex patterns for that.

### Prepare CI/CD pipelines

- [ ] code coverage
- [ ] code linting/formatting check on CI/CD
- [ ] code linting/formatting on commit
- [ ] updating README

### Port to Vite

https://dev.to/nilanth/use-vite-for-react-apps-instead-of-cra-3pkg

### Application redesign

Create new design for existing components. Move some of them into storybook. 

- [ ] Prepare UI Specification
- [ ] Update components

**Comments**:

Figma available here: https://www.figma.com/file/JtYA2rmwQZvyOZOfmZU7IV/Task-Time-Tracker?node-id=0%3A1

Flows to consider:

- expanding/collapsing grouped tasks
- editing text of the task
  - for all tasks in group
  - for individual tasks in group?
- editing time of the tasks: starting time and ending time or duration
- underling DX1-XXX tag and creating an anchor for that
- 

## Done 🏆 

### Delete existing time entry

Removing existing time entry. Show confirmation dialog.

### Preload store from the localstorage

Populate redux store from local storage. Save the data from the store to localstorage.

### Editing existing time entry

Editing existing time entry. Change name, change starting time, change stopping time.

### Move store into redux 

Use redux toolkit for storing data. Create selectors for combined time entries etc.

- [x] Connect dummy redux store
- [x] Port existing useTasks into redux

### Editing existing time entry 

As a user I would want to edit existing time entry. For example edit starting time for currently running time entry or edit starting time/stopped time for existing time entries.
