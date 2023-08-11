import { Request, Response } from "express";
import prisma from "../../PrismaClinet";
import { Plan, User } from '@prisma/client'
import { CurrentUser, SubscriptionRequest } from "../Helpers/TypeDefs";
import { authDetails } from "../Helpers/Middleware";
import Stripe from "stripe";
const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), { apiVersion: '2022-11-15' })
let plans = [{
    name: 'Mobile',
    monthly_price: 100,
    yearly_price: 1000,
    video_quality: 'Good',
    resolution: '480p',
    devices: "Phone",
    number_of_active_screens: 1,
    stripe_monthly_id: "price_1NdHBESDwKsWhQ67Ia4MWTpO",
    stripe_yearly_id: "price_1NdHBESDwKsWhQ67HgQmqTNP"
},
{
    name: 'Basic',
    monthly_price: 200,
    yearly_price: 2000,
    video_quality: 'Good',
    resolution: '720p',
    devices: "Phone+Tablet",
    number_of_active_screens: 3,
    stripe_monthly_id: "price_1NdHDLSDwKsWhQ67WGM2ggZ8",
    stripe_yearly_id: "price_1NdHDMSDwKsWhQ67Za7ytHuf"
},
{
    name: 'Standard',
    monthly_price: 500,
    yearly_price: 5000,
    video_quality: 'Better',
    resolution: '1080',
    devices: "Phone+Tablet+Computer",
    number_of_active_screens: 5,
    stripe_monthly_id: "price_1NdHGASDwKsWhQ67OGrXnxgW",
    stripe_yearly_id: "price_1NdHGASDwKsWhQ670QRZ0miN"
},
{
    name: 'Premium',
    monthly_price: 700,
    yearly_price: 7000,
    video_quality: 'Best',
    resolution: '4K+HDR',
    devices: "Phone+Tablet+TV",
    number_of_active_screens: 10,
    stripe_monthly_id: "price_1NdHGzSDwKsWhQ67RlomYgWj",
    stripe_yearly_id: "price_1NdHGzSDwKsWhQ67URl3cqOq"
},
];

const CreatePlans = (req: Request, res: Response) => {
    prisma.plan.createMany({ data: plans }).then((plans) => {
        return res.status(200).json({ message: "Plans Created Successfully!" })
    }).catch((err: Error) => { res.status(500).json({ message: err.message }) })
}


const GetPlans = (req: Request, res: Response) => {
    prisma.plan.findMany().then(
        (plans: Plan[]) => { return res.status(200).json({ plans: plans }) }
    ).catch(
        (err: Error) => { return res.status(500).json({ message: err.message }) }
    )
}

const SubscriptionHandler = async (req: Request, res: Response) => {
    let currUser: CurrentUser = authDetails(req);

    const body: SubscriptionRequest = req.body;

    if (!body.plan_id) {
        return res.status(400).json({ message: "Missing Plan Id" });
    }
    let user = await prisma.user.findFirst({ where: { id: currUser.id }, include: { subscription: true } });

    if (user?.subscription) {
        await prisma.subscription.delete({ where: { user_id: currUser.id } })
    }
    let plan = await prisma.plan.findFirst({ where: { id: body.plan_id } });
    // handle stripe logic
    prisma.subscription.create({
        data: {
            stripe_id: String(currUser.id),
            plan_id: Number(plan?.id),
            user_id: currUser.id,
            is_monthly: body.is_monthly
        }
    }).then(() => { return res.status(200).json({ message: "subscription created successfully" }) }).catch((err: Error) => {
        return res.status(500).json({ message: err.message })
    })
}

const CancellationHandler = async (req: Request, res: Response) => {
    let currUser: CurrentUser = authDetails(req);

    //handle stripe logic
    prisma.subscription.update({
        where: { user_id: currUser.id }, data: {
            is_cancelled: true
        }
    }).then(()=>res.status(200).json({message : "subscription cancelled!"})).catch((err : Error)=>{return res.status(500).json({message : err.message})})
}

const GetSubscriptionDetails = async (req: Request, res: Response) => {
    const currUser: CurrentUser = authDetails(req);
    let subscription = await prisma.subscription.findFirst({ where: { user_id: currUser.id }, include : {details : true} })
    res.status(200).json({ subscription: subscription });
}
export { CreatePlans, GetPlans, SubscriptionHandler, CancellationHandler, GetSubscriptionDetails }