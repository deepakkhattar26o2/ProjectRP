import PlanDetails from "./PlanDetails"
function CurrentPlanScreen({ logout }: any) {
    
    return (
        <div className="flex items-center justify-center h-screen" style={{ height: '100vh', width: "100vw", backgroundColor: "#1f4c91" }}>
            <PlanDetails/>
        </div>
    )
}

export default CurrentPlanScreen