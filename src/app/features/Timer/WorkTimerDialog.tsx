import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datepicker.module.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/Dialog";
import { useAppDispatch } from "../../hooks";
import { startTimer, pauseTimer, resetTimer, setTimerDuration } from "./slice";
import { formatElapsedTime } from "../../utils";
import { Play, Pause, RotateCcw, Clock, Target } from "lucide-react";
import { testId } from "../../testUtils/testId";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  remainingMs: number;
  isRunning: boolean;
}

export const WorkTimerDialog = ({
  open,
  onOpenChange,
  remainingMs,
  isRunning,
}: Props) => {
  const dispatch = useAppDispatch();
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [targetTime, setTargetTime] = useState<Date | null>(null);

  const startTimerUntilTime = (hours: number, minutes: number) => {
    const now = new Date();
    const target = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0,
      0,
    );

    if (target.getTime() < now.getTime()) {
      target.setDate(target.getDate() + 1);
    }

    const durationMs = target.getTime() - now.getTime();
    dispatch(setTimerDuration(durationMs));
    dispatch(startTimer());
    setIsCustomMode(false);
  };

  const start8HourTimer = () => {
    dispatch(resetTimer());
    dispatch(startTimer());
    setIsCustomMode(false);
  };

  const calculateCustomDuration = () => {
    if (!targetTime) return null;
    const now = new Date();
    const target = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      targetTime.getHours(),
      targetTime.getMinutes(),
      0,
      0,
    );
    if (target.getTime() < now.getTime()) {
      target.setDate(target.getDate() + 1);
    }
    const ms = target.getTime() - now.getTime();

    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0 && minutes === 0) return "less than a minute";
    if (hours === 0) return `${minutes} minutes`;
    if (minutes === 0) return `${hours} hours`;
    return `${hours} hours ${minutes} minutes`;
  };

  const handleSetTargetTime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetTime) return;

    const now = new Date();
    const target = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      targetTime.getHours(),
      targetTime.getMinutes(),
      0,
      0,
    );

    // If target is before now, assume tomorrow
    if (target.getTime() < now.getTime()) {
      target.setDate(target.getDate() + 1);
    }

    const durationMs = target.getTime() - now.getTime();
    dispatch(setTimerDuration(durationMs));
    dispatch(startTimer());
    setTargetTime(null);
    setIsCustomMode(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" aria-label="Work timer dialog">
        <DialogHeader>
          <DialogTitle>Work Timer</DialogTitle>
          <DialogDescription>
            Manage your daily work timer settings and progress.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-4 sm:py-6 gap-4 sm:gap-6">
          <div
            className="font-mono tracking-wider tabular-nums font-semibold text-neutral-800 text-[clamp(2.5rem,14vw,3.75rem)] leading-none"
            data-testid={testId.workTimerDialogValue}
          >
            {formatElapsedTime(remainingMs)}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isRunning ? (
              <button
                onClick={() => dispatch(pauseTimer())}
                className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-2.5 bg-amber-100 text-amber-900 rounded-full hover:bg-amber-200 transition-colors font-medium border border-amber-200 text-sm sm:text-base"
              >
                <Pause
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                  fill="currentColor"
                />
                Pause
              </button>
            ) : (
              <button
                onClick={() => dispatch(startTimer())}
                className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-2.5 bg-emerald-100 text-emerald-900 rounded-full hover:bg-emerald-200 transition-colors font-medium border border-emerald-200 text-sm sm:text-base"
              >
                <Play
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                  fill="currentColor"
                />
                Resume
              </button>
            )}
            <button
              onClick={() => dispatch(resetTimer())}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors border border-transparent hover:border-neutral-200 font-medium text-sm sm:text-base"
              title="Reset Timer (8 hours)"
            >
              <RotateCcw className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              Reset
            </button>
          </div>
        </div>

        {!isRunning && (
          <div className="mt-2 border-t pt-6">
            <h3 className="text-sm font-medium text-neutral-700 mb-3">
              Set new timer
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={start8HourTimer}
                className="flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-700 transition-all cursor-pointer hover:bg-neutral-100 hover:text-neutral-900"
              >
                <Clock size={16} />8 Hours
              </button>
              <button
                type="button"
                onClick={() => startTimerUntilTime(17, 0)}
                className="flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-700 transition-all cursor-pointer hover:bg-neutral-100 hover:text-neutral-900"
              >
                <Target size={16} />
                Till 17:00
              </button>
              <button
                type="button"
                onClick={() => startTimerUntilTime(15, 0)}
                className="flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-700 transition-all cursor-pointer hover:bg-neutral-100 hover:text-neutral-900"
              >
                <Target size={16} />
                Till 15:00
              </button>
              <button
                type="button"
                onClick={() => setIsCustomMode(!isCustomMode)}
                className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-all ${
                  isCustomMode
                    ? "border-neutral-800 bg-neutral-800 text-white shadow-sm cursor-pointer"
                    : "border-neutral-300 bg-neutral-50 text-neutral-700 cursor-pointer hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                Custom
              </button>
            </div>

            {isCustomMode && (
              <form
                onSubmit={handleSetTargetTime}
                className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="flex-1 drop-shadow-sm">
                  <label
                    htmlFor="targetTime"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Count down until
                  </label>
                  <DatePicker
                    portalId="root-portal"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 sm:py-2.5 text-sm sm:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    selected={targetTime}
                    wrapperClassName={styles.date_picker}
                    onChange={(date: Date | null) => setTargetTime(date)}
                    timeInputLabel="Time:"
                    dateFormat="HH:mm"
                    showTimeInput
                    placeholderText="e.g. 17:00"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!targetTime}
                  className="h-11 px-4 py-2 sm:py-2.5 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 font-medium whitespace-nowrap flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Clock size={16} />
                  {targetTime
                    ? `Start (${calculateCustomDuration()})`
                    : "Start Custom"}
                </button>
              </form>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
