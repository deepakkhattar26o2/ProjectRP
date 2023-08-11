import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ActiveBadge = () => {
    return <span style={{ height: "fit-content", alignSelf: 'center' }} className=" bg-blue-300 text-blue-700 px-1 mr-2 text-xs rounded ">Active</span>
}
const CancelledBadge = () => {
    return <span style={{ height: "fit-content", alignSelf: 'center' }} className=" bg-red-300 text-red-700 px-1 mr-2 text-xs rounded ">Cancelled</span>
}

const ExistingPlan = ({ navigate, isCancelled, plan, isMonthly, expDate, createdAt, setCancel }: any) => {
    const handleCancel = (e : React.MouseEvent) => {
        e.preventDefault();
        axios.delete(`${import.meta.env.VITE_API_URL}/plan/cancel`, {
            headers: {
                "authorization": sessionStorage.getItem("token")
            }
        }).then(()=>{setCancel(true)}).catch(err=>console.log(err))
    }
    return <div className=" h-72 flex flex-col  bg-white shadow-md border border-gray-200 rounded-xl p-4" style={{ width: "30vw" }}>
        <div className="flex justify-between py-5">
            <div className="flex ">
                <h2 className="font-bold text-xl px-1">Current Plan Details</h2>
                {isCancelled ? <CancelledBadge /> : <ActiveBadge />}
            </div>
            <div onClick={(e)=>{handleCancel(e)}} className="text-blue-950 text-md hover:cursor-pointer">{isCancelled ? "" : "Cancel"}</div>
        </div>
        <div className="px-1">
            <div >{plan?.name}</div>
            <div className="text-xs text-slate-700">{plan?.devices}</div>
            <div className="text-xl font-bold py-2">₹{isMonthly ? plan?.monthly_price : plan?.yearly_price}/{isMonthly ? "mo" : "yr"}</div>
            <button
                onClick={(e) => { e.preventDefault(); navigate('/view') }}
                style={{ border: "1px solid #023faa " }}
                className="w-30 border-#023faa rounded-md  px-3 py-1.5 text-sm  leading-6 text-[#023faa] shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {isCancelled ? "Choose Plan" : "Change Plan"}
            </button>
            <div className="bg-slate-200 my-2 p-0.5">
                {isCancelled ? `Your Subscription was cancelled and you will loose access to services on ${months[Number(expDate?.getMonth()) - 1]}  ${expDate?.getDate()}, ${expDate?.getFullYear()}` : `Your Subscription has started on ${months[Number(createdAt?.getMonth()) - 1]} ${createdAt?.getDate()}, ${createdAt?.getFullYear()} and will auto renew on ${months[Number(expDate?.getMonth()) - 1]}  ${expDate?.getDate()}, ${expDate?.getFullYear()}`}
            </div>
        </div>
    </div>
}
const NoPlan = ({ navigate }: any) => {
    return <div className=" h-72 flex flex-col justify-center items-center  bg-white shadow-md border border-gray-200 rounded-xl p-4" style={{ width: "30vw" }}>
        <span className="font-bold text-xl py-4">No Plan Found!</span>
        <button
            onClick={(e) => { e.preventDefault(); navigate('/view') }}
            style={{ border: "1px solid #023faa " }}
            className="w-30 border-#023faa rounded-md  px-3 py-1.5 text-sm  leading-6 text-[#023faa] shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Buy Plan
        </button>
    </div>
}
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export default function PlanDetails() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [plan, setPlan] = useState<Plan>()
    const [isCancelled, setCancelled] = useState(false)
    const [isMonthly, setMonthly] = useState(false)
    const [createdAt, setCreatedAt] = useState<Date>()
    const [expDate, setExpDate] = useState<Date>();
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/plan/details`, { headers: { 'authorization': token } }).then(({ data }) => {
            if (!data?.subscription.details) {
                return;
            }
            let validity = new Date(data.subscription.created_at)
            let is_monthly = data.subscription.is_monthly;
            setPlan(data.subscription.details)
            setCancelled(data.subscription.is_cancelled)
            setMonthly(is_monthly);
            setCreatedAt(new Date(data.subscription.created_at));
            is_monthly ? validity?.setMonth(validity.getMonth() + 1) : validity?.setMonth(validity.getMonth() + 12)
            validity.setDate(validity.getDate() + 1);
            setExpDate(validity);
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <>
            {plan != undefined ? <ExistingPlan setCancel={setCancelled} navigate={navigate} isMonthly={isMonthly} isCancelled={isCancelled} plan={plan} createdAt={createdAt} expDate={expDate} /> : <NoPlan navigate={navigate} />}
        </>
    )
}
