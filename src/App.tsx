import React from "react";
import DataGridComponents from "./components/DataGrid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = (): JSX.Element => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DataGridComponents />
    </QueryClientProvider>
  );
};

export default App;
