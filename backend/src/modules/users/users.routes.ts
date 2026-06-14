import { Router } from "express";
import { UsersController } from "./users.controller";
import { authMiddleware, adminMiddleware } from "../../middlewares/auth.middleware";

const routes = Router();
const controller = new UsersController();

routes.use(authMiddleware, adminMiddleware);
routes.get("/", controller.findAll);
routes.get("/:id", controller.findById);

export default routes;