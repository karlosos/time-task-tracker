import { formatElapsedTime, hoursToMs } from "../../../../utils";

export const LoggedTimeBadge = ({
  label,
  reportedTimePerDay,
  targetHours,
}: {
  label: string;
  targetHours: number;
  reportedTimePerDay: number;
}) => {
  const percentage = (reportedTimePerDay / hoursToMs(targetHours)) * 100;
  const grade = calculateGrade(percentage);

  const colors = {
    bad: "#ba4244",
    meh: "#d2812c",
    good: "#59b173",
    great: "#546cc0",
  };

  let backgroundColor: string = "";

  switch (grade) {
    case "BAD":
      backgroundColor = colors.bad;
      break;
    case "MEH":
      backgroundColor = colors.meh;
      break;
    case "GOOD":
      backgroundColor = colors.good;
      break;
  }

  return (
    <div className="relative" title={`${percentage.toFixed(0)}% of target`}>
      <div className="flex items-center text-xs font-semibold">
        <span className="rounded rounded-r-none rounded-b-none border border-neutral-500 bg-neutral-500 pl-2 pr-1 text-white min-w-[50px]">
          {label}
        </span>
        <span className="flex  items-center rounded rounded-l-none  rounded-b-none border bg-neutral-100 pl-1 pr-2  text-neutral-700 opacity-50 tabular-nums">
          {formatElapsedTime(reportedTimePerDay)}
        </span>
      </div>
      <div className="absolute w-[100%] h-1 rounded-t-none rounded border-0 border-neutral-200 bg-neutral-100">
        <div
          className={`h-full rounded rounded-t-none`}
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: backgroundColor,
            borderBottomRightRadius: percentage < 100 ? "0px" : "4px",
          }}
        />
      </div>
    </div>
  );
};

export type Grade = "GREAT" | "GOOD" | "MEH" | "BAD";

export const calculateGrade = (percentage: number): Grade => {
  if (percentage > 100) {
    return "GREAT";
  }

  if (percentage > 90) {
    return "GOOD";
  }

  if (percentage > 50) {
    return "MEH";
  }

  return "BAD";
};
