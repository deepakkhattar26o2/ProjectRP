import PlanDetails from "./PlanDetails"
import "../../../dist/output.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CurrentPlanScreen() {
    const navigate = useNavigate();
    useEffect(()=>{
        if(sessionStorage.getItem("token")==null){
            navigate('/', {replace : true})
        }
    }, [])
    return (
        <div className="flex items-center justify-center h-screen" style={{ height: '100vh', width: "100vw", backgroundColor: "#1f4c91" }}>
            <PlanDetails/>
        </div>
    )
}

export default CurrentPlanScreen