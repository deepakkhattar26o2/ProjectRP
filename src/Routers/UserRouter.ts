import { Router } from "express";
import { LoginHandler, SignupHandler } from "../Controllers/UserController";
const UserRouter = Router();

UserRouter.post('/signup', SignupHandler);

UserRouter.post('/login', LoginHandler);

export default UserRouter; 