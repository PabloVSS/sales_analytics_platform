import { Router } from "express";
import { ProductsController } from "./products.controller";

const routes = Router();

const controller = new ProductsController();

routes.get("/", controller.findAll);

routes.get("/:id", controller.findById);

export default routes;