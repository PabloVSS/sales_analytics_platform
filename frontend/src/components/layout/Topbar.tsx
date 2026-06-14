import { FiMoon, FiSun, FiBell, FiSearch } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="pl-10 pr-4 py-2 w-80 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          aria-label="Notificações"
        >
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        <div className="flex items-center gap-2 ml-2 pl-3 border-l border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-400 hidden sm:block">
            {user?.email || "Usuário"}
          </span>
        </div>
      </div>
    </header>
  );
}