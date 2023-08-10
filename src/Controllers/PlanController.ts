import { Request, Response } from "express";
import prisma from "../../PrismaClinet";
import { Plan, User } from '@prisma/client'
import { CurrentUser, SubscriptionRequest } from "../Helpers/TypeDefs";
import { authDetails } from "../Helpers/Middleware";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
let plans = [{
    name: 'Basic',
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
    name: 'Standard',
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
    name: 'Premium',
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
    name: 'Regular',
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
        return res.status(409).json({ message: `You're already subscribed to a plan!` })
    }
    let plan = await prisma.plan.findFirst({where : {id : body.plan_id}});

    try {
        const { card_number, expMonth, expYear, cvc } = req.body;
        console.log(card_number)
        // Create a customer
        const customer = await stripe.customers.create({
            name: currUser.name,
            email: currUser.email,
            source: card_number,
        });
        console.log(customer)
        //update customer_id in user in db
        
        // Create a subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: body.is_monthly ? plan?.stripe_monthly_id : plan?.stripe_yearly_id}],
        });
        //create subscription in db


        res.status(200).json({ message: "Subscription Successful" , deets : subscription, customer : customer})
    } catch (error : any) {
        res.status(500).json({messsage : error.message});
    }
}

const CancellationHandler = async (req: Request, res: Response) => {
    let currUser: CurrentUser = authDetails(req);

    let plans = await prisma.plan.findMany();
    if (plans.length == 0) {
        return res.status(404).json({ message: "Plans not found!" });
    }

    //handle cancellation logic
    prisma.user.update({
        where: { id: currUser.id }, data: {
            subscription: { disconnect: true },
        }
    }).then((data) => {
        return res.status(200).json({ message: "Subscription cancelled successfully" });
    }).catch((err: Error) => { return res.status(500).json({ message: err.message }) })
}

const GetSubscriptionDetails = async (req: Request, res: Response) => {
    const currUser: CurrentUser = authDetails(req);
    let user = await prisma.user.findFirst({ where: { id: currUser.id }, include: { subscription: { include: { details: true } } } });
    return res.status(200).json({ subscription: user?.subscription, is_monthly: user?.has_monthly_plan });
}
export { CreatePlans, GetPlans, SubscriptionHandler, CancellationHandler, GetSubscriptionDetails }