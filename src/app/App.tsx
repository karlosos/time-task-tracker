import { Container } from "@mui/material";
import { TimeEntriesList } from "./features/timeEntriesList";
import { TopBar } from "./features/topBar";

function App() {
  return (
    <Container maxWidth="sm">
      <TopBar />
      <hr />
      <TimeEntriesList />
    </Container>
  );
}

export default App;
