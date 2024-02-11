import { BaseLayout } from "./layouts/baseLayout";
import { Dashboard } from "./pages/dashboard";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <Dashboard />
      </BaseLayout>
    </QueryClientProvider>
  );
}

export default App;
