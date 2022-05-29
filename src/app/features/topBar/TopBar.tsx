import { useAppSelector } from "../../hooks";
import { selectCurrentTimeEntry } from "../../store/timeEntries";
import { CurrentTimeEntry } from "./CurrentTimeEntry";
import { NewTimeEntry } from "./NewTimeEntry";
import { TopBarStyled } from "./TopBar.style";

export const TopBar = () => {
  const currentTimeEntry = useAppSelector(selectCurrentTimeEntry);

  return (
    <TopBarStyled>
      {currentTimeEntry ? (
        <CurrentTimeEntry currentTimeEntry={currentTimeEntry} />
      ) : (
        <NewTimeEntry />
      )}
    </TopBarStyled>
  );
};
