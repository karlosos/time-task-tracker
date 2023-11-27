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
      <div className="absolute bottom-0 left-0 mx-auto flex w-full max-w-screen-sm items-center justify-start gap-1 border-t px-2 py-1 mobile:bottom-auto mobile:left-auto mobile:right-0 mobile:top-4 mobile:w-auto mobile:flex-col mobile:items-end mobile:justify-center mobile:border-none mobile:py-0">
        <Settings />
        <GithubButton />
      </div>
      <div className="mx-auto flex min-h-screen max-w-screen-sm flex-col px-2 py-4">
        <TopBar />
        <TimeEntriesList />
      </div>
    </ThemeProvider>
  );
}

export default App;
