import { Router } from "express";
import { LoginHandler, SignupHandler, UpdateVerifiedEmailPassword, VerifyEmail } from "../Controllers/UserController";
const UserRouter = Router();

UserRouter.post('/signup', SignupHandler);

UserRouter.post('/login', LoginHandler);

UserRouter.post('/verify', VerifyEmail);

UserRouter.patch('/verified', UpdateVerifiedEmailPassword);

export default UserRouter; 