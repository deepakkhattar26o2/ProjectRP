import { Router } from "express";
import { createPlans, getPlans } from "../Controllers/PlanController";
const PlanRouter = Router();

PlanRouter.post('/create', createPlans);

PlanRouter.get('/all', getPlans);

export default PlanRouter; 