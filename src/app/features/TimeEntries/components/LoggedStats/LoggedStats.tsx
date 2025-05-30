import { CircleSlash2 } from "lucide-react";
import { useAppSelector } from "../../../../hooks";
import {
  selectLast7DaysReportedTime,
  selectTodayReportedTime,
} from "../../store";
import { formatElapsedTimeHM } from "../../../../utils";
import { RootState } from "../../../../store/store";

export const TimeReportedStats = () => {
  const todayReportedTime = useAppSelector(selectTodayReportedTime);
  const last7DaysReportedTime = useAppSelector(selectLast7DaysReportedTime);

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
          {formatElapsedTimeHM(last7DaysReportedTime / 5)}
        </span>
      </div>
    </div>
  );
};
