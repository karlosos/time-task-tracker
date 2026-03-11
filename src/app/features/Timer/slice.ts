import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatDayMonthYear, hoursToMs } from "../../utils";
import { clearAppState, loadBackup } from "../../store/commonActions";

export interface ShiftTimer {
  remainingMs: number;
  isRunning: boolean;
  lastTickTimestamp: number | null;
}

export interface ShiftTimerState {
  timers: Record<string, ShiftTimer>;
}

const DEFAULT_SHIFT_DURATION = hoursToMs(8);

export const shiftTimerInitialState: ShiftTimerState = {
  timers: {},
};

const getTodayKey = () => formatDayMonthYear(Date.now());

const ensureTodayTimer = (state: ShiftTimerState) => {
  const today = getTodayKey();
  if (!state.timers[today]) {
    state.timers[today] = {
      remainingMs: DEFAULT_SHIFT_DURATION,
      isRunning: false,
      lastTickTimestamp: null,
    };
  }
  return today;
};

export const shiftTimer = createSlice({
  name: "shiftTimer",
  initialState: shiftTimerInitialState,
  reducers: {
    startTimer: (state) => {
      const today = ensureTodayTimer(state);
      state.timers[today].isRunning = true;
      state.timers[today].lastTickTimestamp = Date.now();
    },
    pauseTimer: (state) => {
      const today = ensureTodayTimer(state);
      if (
        state.timers[today].isRunning &&
        state.timers[today].lastTickTimestamp
      ) {
        const now = Date.now();
        const elapsed = now - state.timers[today].lastTickTimestamp!;
        state.timers[today].remainingMs =
          state.timers[today].remainingMs - elapsed;
      }
      state.timers[today].isRunning = false;
      state.timers[today].lastTickTimestamp = null;
    },
    resetTimer: (state) => {
      const today = ensureTodayTimer(state);
      state.timers[today] = {
        remainingMs: DEFAULT_SHIFT_DURATION,
        isRunning: false,
        lastTickTimestamp: null,
      };
    },
    setTimerDuration: (state, action: PayloadAction<number>) => {
      const today = ensureTodayTimer(state);
      state.timers[today].remainingMs = action.payload;
    },
    tick: (state) => {
      const today = ensureTodayTimer(state);
      const timer = state.timers[today];
      if (timer.isRunning && timer.lastTickTimestamp) {
        const now = Date.now();
        const elapsed = now - timer.lastTickTimestamp;
        timer.remainingMs = timer.remainingMs - elapsed;
        timer.lastTickTimestamp = now;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearAppState, () => shiftTimerInitialState);
    builder.addCase(loadBackup, (state, action) => {
      // If the backup contains timer data, use it
      if ((action.payload as any).shiftTimer) {
        return (action.payload as any).shiftTimer;
      }
      return state;
    });
  },
});

export const { startTimer, pauseTimer, resetTimer, setTimerDuration, tick } =
  shiftTimer.actions;
