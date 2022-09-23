import { TimeEntriesList } from "./features/timeEntriesList";
import { TopBar } from "./features/topBar";

function App() {
  return (
    <div className="min-h-screen max-w-screen-sm flex flex-col py-4 px-2 mx-auto">
      <TopBar />
      <TimeEntriesList />
    </div>
  );
}

export default App;
