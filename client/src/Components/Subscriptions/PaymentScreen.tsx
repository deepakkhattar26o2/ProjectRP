import PaymentForm from "./PaymentForm"

function PaymentScreen({plan, isMonthly, flip} : {plan :Plan, isMonthly : Boolean, flip : any}) {
    
    return (
        <div className="flex items-center justify-center h-screen" style={{ height: '100vh', width: "100vw", backgroundColor: "#1f4c91" }}>
            <PaymentForm  plan={plan} isMonthly={isMonthly} flip={flip}/>
        </div>
    )
}

export default PaymentScreen