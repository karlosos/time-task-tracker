import { CircleSlash2, Frown, Laugh, Meh, Smile } from "lucide-react";
import { useAppSelector } from "../../../../hooks";
import {
  selectLast7DaysReportedTime,
  selectTodayReportedTime,
} from "../../store";
import { formatElapsedTimeHM, msToHours } from "../../../../utils";
import { RootState } from "../../../../store/store";

const WORKING_DAYS = 5;

export const TimeReportedStats = () => {
  const todayReportedTime = useAppSelector(selectTodayReportedTime);
  // TODO: this should calculate average reported time but only for days which has entries
  const last7DaysReportedTime = useAppSelector(selectLast7DaysReportedTime);
  const last7DaysStatus = getLast7DaysStatus(last7DaysReportedTime);

  const isAdjustableTimeReportingEnabled = useAppSelector(
    (state: RootState) =>
      state.settings.featureFlags.isAdjustableTimeReportingEnabled,
  );

  if (!isAdjustableTimeReportingEnabled) {
    return null;
  }

  return (
    <div className="flex gap-3 mobile:flex-col ml-auto">
      <div className="flex gap-1 items-center">
        <div className="text-[9px] bg-neutral-300 text-neutral-600 rounded px-1 leading-none py-0.5 font-semibold">
          TODAY
        </div>
        <div>
          <span className="font-medium text-neutral-600">
            {formatElapsedTimeHM(todayReportedTime)}
          </span>
          /<span className="text-[11px] text-neutral-600">06:00</span>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <div className="text-[9px] bg-neutral-300 text-neutral-600 rounded px-1 leading-none py-0.5 font-semibold">
          WEEK
        </div>
        <CircleSlash2 className="w-2 h-2 text-neutral-600" />
        <span className="text-neutral-600 font-medium">
          {formatElapsedTimeHM(last7DaysReportedTime / WORKING_DAYS)}
        </span>
        {last7DaysStatus === "BAD" && (
          <Frown className="w-3 h-3 text-red-600" />
        )}
        {last7DaysStatus === "MEH" && (
          <Meh className="w-3 h-3 text-yellow-600" />
        )}
        {last7DaysStatus === "GOOD" && (
          <Smile className="w-3 h-3 text-green-600" />
        )}
        {last7DaysStatus === "GREAT" && (
          <Laugh className="w-3 h-3 text-sky-600" />
        )}
      </div>
    </div>
  );
};

const getLast7DaysStatus = (time: number) => {
  const hours = msToHours(time / WORKING_DAYS);

  if (hours > 6) {
    return "GREAT";
  }

  if (hours > 5) {
    return "GOOD";
  }

  if (hours > 2) {
    return "MEH";
  }

  return "BAD";
};
