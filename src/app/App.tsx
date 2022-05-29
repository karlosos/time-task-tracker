import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useState } from "react";
import { CurrentTimeEntry } from "./components/CurrentTimeEntry";
import { NewTimeEntry } from "./components/NewTimeEntry";
import { TimeEntryRow } from "./components/TimeEntryRow";
import { CombinedTimeEntryRow } from "./components/CombinedTimeEntryRow";
import { useAppSelector } from "./hooks/storeHooks";
import {
  TimeEntry,
  selectTimeEntriesByDate,
  selectCombinedTimeEntries,
  selectCurrentTimeEntry,
} from "./timeEntriesSlice";

function App() {
  const timeEntriesByDate = useAppSelector(selectTimeEntriesByDate);
  const combinedTimeEntries = useAppSelector(selectCombinedTimeEntries);
  const currentTimeEntry = useAppSelector(selectCurrentTimeEntry);

  const [isCollapsedMode, setIsCollapsedMode] = useState(false);

  const renderTimeEntries = () => {
    if (isCollapsedMode) {
      return Object.entries(combinedTimeEntries)
        .sort((a, b) => (a[0] > b[0] ? -1 : 1))
        .map(([date, combinedTimeEntriesPerDate]: any[]) => {
          return (
            <>
              {date}
              {combinedTimeEntriesPerDate.map((combinedTimeEntries: any) => (
                <CombinedTimeEntryRow combinedTimeEntry={combinedTimeEntries} />
              ))}
            </>
          );
        });
    } else {
      return Object.entries(timeEntriesByDate).map(([date, timeEntriesPerDate]: any[]) => {
        return (
          <>
            {date}
            {timeEntriesPerDate.map((timeEntry: TimeEntry) => (
              <TimeEntryRow timeEntry={timeEntry} />
            ))}
          </>
        );
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {currentTimeEntry ? (
          <CurrentTimeEntry
            currentTimeEntry={currentTimeEntry}
          />
        ) : (
          <NewTimeEntry />
        )}
      </Box>
      <hr />
      <button onClick={() => setIsCollapsedMode((state) => !state)}>
        {isCollapsedMode ? "Extend entries" : "Collapse entries by names"}
      </button>
      <Box sx={{ flexGrow: 1 }}>{renderTimeEntries()}</Box>
    </Container>
  );
}

export default App;
