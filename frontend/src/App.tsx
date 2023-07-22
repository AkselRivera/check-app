import "./App.css";

import { MainPage } from "./pages/MainPage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen">
        <MainPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
