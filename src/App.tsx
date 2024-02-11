import { BaseLayout } from "./layouts/baseLayout";
import { Home } from "./pages/home";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <Home />
      </BaseLayout>
    </QueryClientProvider>
  );
}

export default App;
