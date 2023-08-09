import { Router } from "express";
import { CancellationHandler, CreatePlans, GetPlans, GetSubscriptionDetails, SubscriptionHandler } from "../Controllers/PlanController";
import { verifyAuth } from "../Helpers/Middleware";
const PlanRouter = Router();

PlanRouter.post('/create', CreatePlans);

PlanRouter.get('/all', verifyAuth, GetPlans);

PlanRouter.get('/details', verifyAuth, GetSubscriptionDetails)

PlanRouter.post('/buy', verifyAuth, SubscriptionHandler);

PlanRouter.delete('/cancel', verifyAuth, CancellationHandler)

export default PlanRouter; 