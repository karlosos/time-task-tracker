import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store/store";
import { tick } from "./slice";
import { formatElapsedTime } from "../../utils";
import { Timer as TimerIcon } from "lucide-react";
import useSound from "use-sound";
import { WorkTimerDialog } from "./WorkTimerDialog";
import xpShutdownSfx from "../../../../assets/xp-shutdown.mp3";
import { testId } from "../../testUtils/testId";

const DEFAULT_TIMER_STATE = {
  remainingMs: 8 * 60 * 60 * 1000,
  isRunning: false,
  lastTickTimestamp: null,
};

export const WorkTimerBadge = () => {
  const dispatch = useAppDispatch();
  const isEnabled = useAppSelector(
    (state: RootState) => state.settings.featureFlags.isShiftTimerEnabled,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const timerState = useAppSelector(
    (state: RootState) => state.shiftTimer.timers[today] || DEFAULT_TIMER_STATE,
  );

  const { remainingMs, isRunning } = timerState;

  const [playFinishedSound] = useSound(xpShutdownSfx);
  const wasRunning = useRef(isRunning);

  const prevRemainingMs = useRef(remainingMs);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  useEffect(() => {
    // Sound on crossing 0
    if (isRunning && prevRemainingMs.current > 0 && remainingMs <= 0) {
      playFinishedSound();
    }
    wasRunning.current = isRunning;
    prevRemainingMs.current = remainingMs;
  }, [isRunning, remainingMs, playFinishedSound]);

  if (!isEnabled) return null;

  const isFinished = remainingMs <= 0;

  return (
    <>
      <button
        onClick={() => {
          setIsDialogOpen(true);
        }}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border rounded-full shadow-sm ml-2 hover:bg-neutral-50 transition-colors"
        title="Open Timer Settings"
      >
        <div className="flex items-center gap-1.5 text-neutral-600">
          {isFinished ? (
            <OvertimePing />
          ) : isRunning ? (
            <LivePing />
          ) : (
            <TimerIcon size={16} />
          )}
          <span
            className="tabular-nums text-sm font-semibold text-neutral-800"
            data-testid={testId.workTimerBadgeValue}
          >
            {formatElapsedTime(remainingMs)}
          </span>
        </div>
      </button>

      <WorkTimerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        remainingMs={remainingMs}
        isRunning={isRunning}
      />
    </>
  );
};

const LivePing = () => {
  return (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
    </span>
  );
};

const OvertimePing = () => {
  return (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
    </span>
  );
};
