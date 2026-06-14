import { Router } from "express";
import { OrdersController } from "./orders.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const routes = Router();
const controller = new OrdersController();

routes.use(authMiddleware);
routes.get("/", controller.findAll);
routes.get("/:id", controller.findById);
routes.get("/:id/export/csv", controller.exportCsvById);
routes.get("/export/csv", controller.exportCsv);
export default routes;