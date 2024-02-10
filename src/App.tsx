import { BaseLayout } from "./layouts/baseLayout";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <>
      <BaseLayout>
        <Dashboard />
      </BaseLayout>
    </>
  );
}

export default App;
