import { Router } from 'express';
import { AuthController } from './auth.controller';

const routes = Router();

const controller = new AuthController();

routes.post(
  "/login",
  (req, res) => controller.login(req, res)
);
export default routes;