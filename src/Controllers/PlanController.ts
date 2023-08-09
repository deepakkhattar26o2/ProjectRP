import { Request, Response } from "express";
import prisma from "../../PrismaClinet";
import { Plan , User} from '@prisma/client'
import { CurrentUser, SubscriptionRequest } from "../Helpers/TypeDefs";
import { authDetails } from "../Helpers/Middleware";
let plans = [{
    name: 'Basic',
    monthly_price: 100,
    yearly_price: 1000,
    video_quality: 'Good',
    resolution: '480p',
    devices: "Phone",
    number_of_active_screens: 1,
},
{
    name: 'Standard',
    monthly_price: 200,
    yearly_price: 2000,
    video_quality: 'Good',
    resolution: '720p',
    devices: "Phone+Tablet",
    number_of_active_screens: 3,
},
{
    name: 'Premium',
    monthly_price: 500,
    yearly_price: 5000,
    video_quality: 'Better',
    resolution: '1080',
    devices: "Phone+Tablet+Computer",
    number_of_active_screens: 5,
},
{
    name: 'Regular',
    monthly_price: 700,
    yearly_price: 7000,
    video_quality: 'Best',
    resolution: '4K+HDR',
    devices: "Phone+Tablet+TV",
    number_of_active_screens: 10,
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

    let plans = await prisma.plan.findMany();
    if (plans.length == 0) {
        return res.status(404).json({ message: "Plans not found!" });
    }


    const body: SubscriptionRequest = req.body;
    if (!body.plan_id || !body.is_monthly) {
        return res.status(400).json({ message: "Missing Plan Id or subscription mode" });
    }


    //handle payment logic!
    prisma.user.update({
        where: { id: currUser.id }, data: {
            active_plan: { connect: { id: body.plan_id } },
            has_monthly_plan: body.is_monthly || false
        }
    }).then((data) => {
        return res.status(200).json({ message: "Subscribed successfully" });
    })
        .catch((err: Error) => { return res.status(500).json({ message: err.message }) })
}

const CancellationHandler = async (req: Request, res: Response) => {
    let currUser: CurrentUser = authDetails(req);
    const body: { plan_id: number } = req.body;

    let plans = await prisma.plan.findMany();
    if (plans.length == 0) {
        return res.status(404).json({ message: "Plans not found!" });
    }

    prisma.user.update({
        where: { id: currUser.id }, data: {
            active_plan: { disconnect: true },
        }
    }).then((data) => {
        return res.status(200).json({ message: "Subscription cancelled successfully" });
    })
        .catch((err: Error) => { return res.status(500).json({ message: err.message }) })
}

const GetSubscriptionDetails = async (req : Request, res : Response)=>{
    const currUser : CurrentUser = authDetails(req);
    let user  = await prisma.user.findFirst({where : {id : currUser.id}, include : {active_plan : true}});
    return res.status(200).json({details : user?.active_plan, is_monthly : user?.has_monthly_plan});
}
export { CreatePlans, GetPlans, SubscriptionHandler, CancellationHandler, GetSubscriptionDetails }