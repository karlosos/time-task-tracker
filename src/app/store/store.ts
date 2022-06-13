import { configureStore } from '@reduxjs/toolkit'
import { loadState, saveState } from './localStorage';
import timeEntriesReducer from './timeEntries/slice'

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    timeEntries: timeEntriesReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  saveState({
    timeEntries: store.getState().timeEntries,
  })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch