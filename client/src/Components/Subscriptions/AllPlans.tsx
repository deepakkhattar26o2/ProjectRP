import { useEffect, useState } from 'react'
import './AllPlans.css'
import axios from 'axios'
import PaymentScreen from './PaymentScreen'
import { useNavigate } from 'react-router-dom'
export default function AllPlans() {
    const [planType, setPlanType] = useState("Monthly")
    const [selectedPlan, setSelectedPlan] = useState(0)
    const [plans, setPlans] = useState<Plan[]>([])
    const [flip, setFlip] = useState(false)
    const handleSelection = (e: React.MouseEvent) => {
        e.preventDefault();
        setFlip(true)
    }
    const navigate = useNavigate()
    useEffect(() => {
        if(sessionStorage.getItem('token')==null){
            navigate('/', {replace : true})
        }
        axios.get(`${import.meta.env.VITE_API_URL}/plan/all`, { headers: { "authorization": localStorage.getItem("token") || sessionStorage.getItem("token") } }).then(
            ({ data }) => {
                setPlans(data.plans);
            }
        )
            .catch((err) => { console.log(err) })
    }, [])
    const Plans = () => {
        return <div className=' flex flex-wrap  content w-full p-10 text-center'>
            <div className='  flex-grow max-w-full flex-1 px-4 md:w-1/4 pr-4 pl-4 lg:w-1/4 4 sm:w-full sm:mb-2 relative'>
                <div className=' flex flex-wrap  mb-2 button-wrapper-row' style={{ borderRadius: "50%" }}>
                    <div className=' relative flex-grow max-w-full flex-1 px-4 w-full buttons-wrapper'>
                        <div className=' buttons-wrapper rounded-full p-8'>
                            <button value={"Monthly"} onClick={() => setPlanType("Monthly")} className={` btn rounded-pill ${planType == "Monthly" ? "active-button" : ""}`} >
                                Monthly
                            </button>
                            <button value={"Yearly"} onClick={() => setPlanType("Yearly")} className={` btn rounded-pill ${planType == "Yearly" ? "active-button" : ""}`}>
                                Yearly
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap '>
                    <div className=' relative flex-grow max-w-full flex-1 px-4 w-full titles-row '>
                        {titles.map((title, idx) => {
                            return <>
                                <div>
                                    {title}
                                </div>
                            </>
                        })}
                    </div>
                </div>

            </div>
            <div className='relative flex-grow max-w-full flex-1 px-4   md:w-3/4  lg:w-3/4 sm:w-full pr-4 pl-4'>
                <div className='flex flex-wrap '>
                    {plans.map((plan, idx) => {
                        return (
                            <div key={idx} className={` relative flex-grow max-w-full flex-1 px-4 w-1/4 ${idx == selectedPlan ? 'active-texts' : 'plan-texts'}`}>
                                <div onClick={() => setSelectedPlan(idx)} className={` plan-name ${idx == selectedPlan ? "active-plan" : ""}`}>
                                    {plan.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className=' flex flex-wrap  values-row'>
                    {plans.map((plan, idx) => {
                        return (
                            <div key={idx} className={` relative flex-grow max-w-full flex-1 px-4 w-1/4 ${idx == selectedPlan ? 'active-texts' : 'plan-texts'}`}>
                                <div>{"₹ "}{planType == "Monthly" ? plan.monthly_price : plan.yearly_price}</div>
                                <hr />
                                <div>{plan.video_quality}</div>
                                <hr />
                                <div>{plan.resolution}</div>
                                <hr />
                                <div>
                                    {plan.devices.split('+').map((device, index) => (
                                        <p key={index}>{device}</p>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    }
    let titles = [`${planType} price`, "Video Quality", "Resolution", "Devices you can use to watch"]

    return (
        <>
            {flip ? <PaymentScreen plan={plans[selectedPlan]} isMonthly={planType=="Monthly"} flip={setFlip} /> :
            <div className=' container mx-auto sm:px-4 p-6 flex flex-col justify-center items-center'>
                <div className=' flex flex-wrap  mb-3 self-center py-10'>
                    <div className='text-3xl font-bold relative flex-grow max-w-full flex-1 px-4 py-8 w-full h2'>
                        Choose the right plan for you
                    </div>
                </div>
                <Plans />
                <button
                    onClick={(e) => { handleSelection(e) }}
                    type="submit"
                    className="flex w-1/4 h-16  items-center justify-center rounded-md bg-[#023faa] m-5 text-xl font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Next
                </button>
            </div>}
        </>
    )
}
