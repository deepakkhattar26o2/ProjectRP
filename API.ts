import { Router } from "express";
import UserRouter from "./src/Routers/UserRouter";
import PlanRouter from "./src/Routers/PlanRouter";

const AppRouter = Router();

AppRouter.use('/user', UserRouter);

AppRouter.use('/plan', PlanRouter);

export default AppRouter;