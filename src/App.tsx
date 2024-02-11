import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseLayout } from "./layouts/baseLayout";
import { Home } from "./pages/home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10 * (60 * 1000), // 10 mins
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <Home />
      </BaseLayout>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
