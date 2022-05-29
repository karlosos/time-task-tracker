import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface TimeEntriesState {
  value: number
}

const initialState: TimeEntriesState = {
  value: 0,
}

export const timeEntries = createSlice({
  name: 'timeEntries',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = timeEntries.actions

export const selectCount = (state: RootState) => state.timeEntries.value

export default timeEntries.reducer