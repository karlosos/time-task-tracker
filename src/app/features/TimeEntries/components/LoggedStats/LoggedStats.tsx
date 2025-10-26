import { Frown, Laugh, Meh, Smile } from "lucide-react";
import { useAppSelector } from "../../../../hooks";
import {
  selectThisWeekReportedTime,
  selectTodayReportedTime,
} from "../../store";
import { hoursToMs } from "../../../../utils";
import { RootState } from "../../../../store/store";
import {
  calculateGrade,
  Grade,
  LoggedTimeBadge,
} from "../LoggedTimeBadge/LoggedTimeBadge";

export const TimeReportedStats = () => {
  const todayReportedTime = useAppSelector(selectTodayReportedTime);
  // TODO: this should calculate average reported time but only for days which has entries
  const thisWeekReportedTime = useAppSelector(selectThisWeekReportedTime);

  // TODO: use constant from settings
  const todayPercentage = (todayReportedTime / hoursToMs(6)) * 100;
  const todayGrade = calculateGrade(todayPercentage);

  // TODO: use constant from settings
  const weekPercentage = (thisWeekReportedTime / hoursToMs(6 * 5)) * 100;
  const weekGrade = calculateGrade(weekPercentage);

  const isAdjustableTimeReportingEnabled = useAppSelector(
    (state: RootState) =>
      state.settings.featureFlags.isAdjustableTimeReportingEnabled,
  );

  if (!isAdjustableTimeReportingEnabled) {
    return null;
  }

  return (
    <div className="flex mobile:gap-3 gap-6 mobile:flex-col ml-auto bg-white px-2 pt-1 pb-2 border rounded">
      <div className="flex gap-1 items-center">
        <LoggedTimeBadge
          label="Today"
          reportedTimePerDay={todayReportedTime}
          // TODO: move constant to settings
          targetHours={6}
        />
        <GradeIcon grade={todayGrade} />
      </div>
      <div className="flex gap-1 items-center">
        <LoggedTimeBadge
          label="Week"
          reportedTimePerDay={thisWeekReportedTime}
          // TODO: use constant from settings
          targetHours={6 * 5}
        />
        <GradeIcon grade={weekGrade} />
      </div>
    </div>
  );
};

const GradeIcon = ({ grade }: { grade: Grade }) => {
  switch (grade) {
    case "BAD":
      return <Frown className="w-3 h-3 text-red-600" />;
    case "MEH":
      return <Meh className="w-3 h-3 text-yellow-600" />;
    case "GOOD":
      return <Smile className="w-3 h-3 text-green-600" />;
    case "GREAT":
      return <Laugh className="w-3 h-3 text-sky-600" />;
  }
};
