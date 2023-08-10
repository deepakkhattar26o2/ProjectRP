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
    customer_id?: string
}

interface SubscriptionRequest {
    plan_id: number
    is_monthly: boolean
    cardNumber: string,
    expMonth: string,
    expYear: string,
    cvc: string
}
interface VerifiedEmailUpdateRequest{
    email : string,
    password : string
}

export { SignupRequest, LoginRequest,VerifiedEmailUpdateRequest, CurrentUser, SubscriptionRequest }