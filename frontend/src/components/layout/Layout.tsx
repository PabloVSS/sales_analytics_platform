import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useTheme } from "../../context/ThemeContext";

export function Layout() {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen overflow-hidden ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-950">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}