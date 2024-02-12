import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseLayout } from "./layouts/baseLayout";
import { Home } from "./pages/home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <Home />
      </BaseLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
