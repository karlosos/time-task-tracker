import { createTheme, ThemeProvider } from "@mui/material";
import { Settings } from "./features/Settings/Settings";
import { TimeEntriesList } from "./features/TimeEntries/TimeEntriesList";
import { TopBar } from "./features/TimeEntries/TopBar";
import { GithubButton } from "./ui/GithubButton";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="right-0 mx-auto flex max-w-screen-sm items-center justify-end gap-1 px-2 py-1 mobile:absolute mobile:top-4 mobile:flex-col mobile:items-end mobile:justify-center mobile:py-0">
        <Settings />
        <GithubButton />
      </div>
      <div className="mx-auto flex min-h-screen max-w-screen-sm flex-col px-2 py-4 max-mobile:py-0">
        <TopBar />
        <TimeEntriesList />
      </div>
    </ThemeProvider>
  );
}

export default App;
