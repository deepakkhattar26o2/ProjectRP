import { Plan } from "@prisma/client"
interface SignupRequest {
    name: string,
    email: string,
    password: string
}

interface LoginRequest {
    email: string;
    password: string;
}

interface CurrentUser {
    id: number
    name: string,
    email: string,
    active_plan?: Plan
}

interface SubscriptionRequest {
    plan_id: number
    is_monthly : boolean
}

export { SignupRequest, LoginRequest, CurrentUser, SubscriptionRequest}