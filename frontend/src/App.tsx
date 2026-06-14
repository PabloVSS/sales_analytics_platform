import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { RoleProvider } from "./context/RoleContext";
import { router } from "./routes/router";
import "./index.css"; // adicione no topo de main.tsx
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RoleProvider>
            <RouterProvider router={router} />
          </RoleProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}