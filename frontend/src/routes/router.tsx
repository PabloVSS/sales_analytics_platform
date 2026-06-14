import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProductsPage from "../pages/products/ProductsPage";
import CustomersPage from "../pages/customers/CustomersPage"; // importar
import { Layout } from "../components/layout/Layout";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import OrdersPage from "../pages/orders/OrdersPage";
import OrderDetailPage from "../pages/orders/OrderDetailPage";
import UsersPage from "../pages/users/UsersPage";
import CustomerDetailPage from "../pages/customers/CustomerDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/customers",
        element: <CustomersPage />,
      },
       {
        path: "/orders",          // ← nova rota
        element: <OrdersPage />,
      },
      {
        path: "/orders/:id",
        element: <OrderDetailPage />,
      },
      { path: "/users", 
        element: <UsersPage />
       },
       {
        path: "/customers/:id",
        element: <CustomerDetailPage />,
      },
    ],
  },
]);