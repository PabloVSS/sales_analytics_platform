import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const routes = Router();
const controller = new DashboardController();

routes.use(authMiddleware);

routes.get("/kpis", controller.kpis);
routes.get("/monthly-revenue", controller.monthlyRevenue);
routes.get("/top-customers", controller.topCustomers);
routes.get("/top-products", controller.topProducts);
routes.get("/categories", controller.categories);

export default routes;