import { Request, Response } from "express";
import prisma from "../../PrismaClinet";
import {Plan} from '@prisma/client'
let plans =[{
    name:'Basic',
    monthly_price:100,
    yearly_price: 1000,
    video_quality:'Good',
    resolution:'480p',
    devices : "Phone",
    number_of_active_screens:1,
}, 
{
    name:'Standard',
    monthly_price:200,
    yearly_price: 2000,
    video_quality:'Good',
    resolution:'720p',
    devices : "Phone+Tablet",
    number_of_active_screens:3,
}, 
{
    name:'Premium',
    monthly_price:500,
    yearly_price: 5000,
    video_quality:'Better',
    resolution:'1080',
    devices : "Phone+Tablet+Computer",
    number_of_active_screens:5,
}, 
{
    name:'Regular',
    monthly_price:700,
    yearly_price: 7000,
    video_quality:'Best',
    resolution:'4K+HDR',
    devices : "Phone+Tablet+TV",
    number_of_active_screens:10,
}, 
];

const createPlans = (req : Request, res : Response)=>{
    prisma.plan.createMany({data : plans}).then((plans)=>{
        return res.status(200).json({message : "Plans Created Successfully!"})
    }).catch((err : Error)=>{res.status(500).json({message : err.message})})
}


const getPlans =  (req : Request, res : Response)=>{
    prisma.plan.findMany().then(
        (plans : Plan[])=>{return res.status(200).json({plans : plans})}
    ).catch(
        (err : Error)=>{return res.status(500).json({message : err.message})}
    )
}


export {createPlans, getPlans}