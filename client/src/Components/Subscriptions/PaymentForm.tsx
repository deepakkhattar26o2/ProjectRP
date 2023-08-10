import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react"
export default function PaymentForm({ plan }: { plan: Plan }) {
    const stripe = useStripe();
    const elements = useElements
    const [cardNumber, setCardNumber] = useState('');
    const [exp, setExp] = useState('');
    const [cvc, setCvc] = useState('');
    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        // axios.post(`${import.meta.env.VITE_API_URL}/plan/buy`)
    }
    return (
        <div className=" h-72 flex justify-between bg-white shadow-md border border-gray-200 rounded-xl " style={{ width: "50vw" }}>
            <CardElement/>
            <div style={{ width: "60%", height: '100%', borderTopLeftRadius: "0.75rem", borderBottomLeftRadius: "0.75rem", display: "flex", flexDirection: "column" }} className="px-10" >
                <h2 style={{ paddingTop: "2.5rem" }} className="font-bold text-2xl">Complete Payment</h2>
                <p className="text-slate-700">Enter your credit or debit card details below</p>

                <div style={{ display: "flex", marginTop: "1.5rem" }} className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                    <input onChange={(e) => { setCardNumber(e.target.value) }} style={{ width: "60%" }} placeholder="Card Number" />
                    <input onChange={(e) => { setExp(e.target.value) }} style={{ width: "20%" }} placeholder="MM/YY" type="month" />
                    <input onChange={(e) => { setCvc(e.target.value) }} style={{ width: "20%" }} placeholder="CVC" />
                </div>
                <button
                    type="submit"
                    onClick={(e) => { handleSubmit(e) }}
                    className="flex my-6 w-44 justify-center rounded-md bg-[#023faa] p-3 text-smpx-3  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Confirm Payment
                </button>
            </div>
            <div style={{ width: "40%", height: '100%', borderBottomRightRadius: "0.75rem", borderTopRightRadius: "0.75rem", backgroundColor: "#F4F4F6", display: "flex", flexDirection: "column" }} className="px-10">
                <h2 style={{ paddingTop: "2.5rem" }} className="font-bold text-2xl">Order Summary</h2>
                <div className="flex justify-between py-2">
                    <div>Plan Name </div><div>{plan.name}</div>
                </div>
                <hr />
                <div className="flex justify-between py-2">
                    <div>Billing Cycle </div><div>{plan.is_monthly ? "Monthly" : "Yearly"}</div>
                </div>
                <hr />
                <div className="flex justify-between py-2">
                    <div>Plan Price </div><div>₹{plan.is_monthly ? plan.monthly_price : plan.yearly_price}/{plan.is_monthly ? "mo" : "yr"}</div>
                </div>
                <hr />
            </div>
        </div>
    )
}
