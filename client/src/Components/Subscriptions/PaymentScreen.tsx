import PaymentForm from "./PaymentForm"
let plan_obj = {
    "id": 1,
    "name": "Mobile",
    "monthly_price": 100,
    "yearly_price": 1000,
    "video_quality": "Good",
    "resolution": "480p",
    "devices": "Phone",
    "number_of_active_screens": 1,
    "stripe_monthly_id": "price_1NdHBESDwKsWhQ67Ia4MWTpO",
    "stripe_yearly_id": "price_1NdHBESDwKsWhQ67HgQmqTNP",
    "is_monthly" : true
}
function PaymentScreen({ logout }: any) {
    
    return (
        <div className="flex items-center justify-center h-screen" style={{ height: '100vh', width: "100vw", backgroundColor: "#1f4c91" }}>
            <PaymentForm  plan={plan_obj}/>
        </div>
    )
}

export default PaymentScreen