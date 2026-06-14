import { Router } from "express";
import { CustomersController } from "./customers.controller";

const routes = Router();

const controller = new CustomersController();

routes.get("/", controller.findAll);

routes.get("/:id", controller.findById);

export default routes;