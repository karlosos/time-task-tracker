import { createTheme, ThemeProvider } from "@mui/material";
import { Settings } from "./features/Settings/Settings";
import { TimeEntriesList } from "./features/TimeEntries/TimeEntriesList";
import { TopBar } from "./features/TimeEntries/TopBar";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Settings />
      <div className="mx-auto flex min-h-screen max-w-screen-sm flex-col px-2 py-4">
        <TopBar />
        <TimeEntriesList />
      </div>
    </ThemeProvider>
  );
}

export default App;
