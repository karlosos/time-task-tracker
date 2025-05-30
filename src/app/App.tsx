import { createTheme, ThemeProvider } from "@mui/material";
import { Settings } from "./features/Settings/Settings";
import { TimeEntriesList } from "./features/TimeEntries/TimeEntriesList";
import { TopBar } from "./features/TimeEntries/TopBar";
import { GithubButton } from "./ui/GithubButton";
import { CircleSlash2 } from "lucide-react";
import { TimeReportedStats } from "./features/TimeEntries/components/LoggedStats/LoggedStats";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="fixed bottom-0 left-0 z-10 mx-auto flex w-full items-center justify-start gap-1 border-t bg-neutral-50 px-2 py-1 mobile:bottom-auto mobile:left-auto mobile:right-0 mobile:top-4 mobile:w-auto mobile:flex-col mobile:items-end mobile:justify-center mobile:border-none mobile:bg-transparent mobile:py-0">
        <Settings />
        <GithubButton />
        <TimeReportedStats />
      </div>
      <div className="mx-auto mb-[40px] flex min-h-screen max-w-screen-sm flex-col px-2 py-4">
        <TopBar />
        <TimeEntriesList />
      </div>
    </ThemeProvider>
  );
}

export default App;
