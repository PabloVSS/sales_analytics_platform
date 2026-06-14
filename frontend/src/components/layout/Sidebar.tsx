import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
  FiBarChart2,
  FiFileText,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext"; // <-- novo import

const menuItems = [
  { path: "/dashboard", icon: FiHome, label: "Dashboard" },
  { path: "/products", icon: FiBox, label: "Products" },
  { path: "/customers", icon: FiUsers, label: "Customers" },
  { path: "/orders", icon: FiFileText, label: "Pedidos" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const { user } = useAuth(); // <-- obtém o usuário do contexto

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
    } ${collapsed ? "justify-center" : ""}`;

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-screen`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-200 dark:border-slate-800">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FiBarChart2 className="text-white" size={18} />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              SalesAnalytics
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        >
          {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
        </button>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={linkClass}>
            <item.icon size={20} />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}

        {/* Link de Usuários - somente ADMIN */}
        {user?.role === "ADMIN" && (
          <NavLink to="/users" className={linkClass}>
            <FiUsers size={20} />
            {!collapsed && <span className="font-medium">Usuários</span>}
          </NavLink>
        )}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400">© 2025 SalesAnalytics v1.0</p>
        </div>
      )}
    </aside>
  );
}