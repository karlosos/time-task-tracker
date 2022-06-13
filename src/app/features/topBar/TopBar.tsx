import { useAppSelector } from "../../hooks";
import { selectCurrentTimeEntry } from "../../store/timeEntries";
import { CurrentTimeEntry } from "./CurrentTimeEntry";
import { NewTimeEntry } from "./NewTimeEntry";

export const TopBar = () => {
  const currentTimeEntry = useAppSelector(selectCurrentTimeEntry);

  return (
    <>
      {currentTimeEntry ? (
        <CurrentTimeEntry currentTimeEntry={currentTimeEntry} />
      ) : (
        <NewTimeEntry />
      )}
    </>
  );
};
