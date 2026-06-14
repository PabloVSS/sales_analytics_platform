import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.routes";
import customersRoutes from "../modules/customers/customers.routes";
import productsRoutes from "../modules/products/products.routes";
import usersRoutes from "../modules/users/users.routes";
import ordersRoutes from "../modules/orders/orders.routes"; 

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/dashboard", dashboardRoutes);
routes.use("/customers", customersRoutes);
routes.use("/products", productsRoutes);
routes.use("/users", usersRoutes);
routes.use("/orders", ordersRoutes); 
export default routes;