import "./App.css";

import { MainPage } from "./pages/MainPage";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "./reducer/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="w-full h-screen">
          <MainPage />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
