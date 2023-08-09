import { Router } from "express";
import UserRouter from "./src/Routers/UserRouter";

const AppRouter = Router();

AppRouter.use('/user', UserRouter)

export default AppRouter;