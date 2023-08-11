import { useEffect, useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import ForgotScreen from "./ForgotScreen";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function AuthScreen() {
    const navigate = useNavigate();
    const [viewLogin, setViewLogin] = useState(false)
    const [viewFP, setViewFP] = useState(false);
    const flip = () => {
        setViewLogin(!viewLogin);
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            navigate("/home")
        }
        if (localStorage.getItem("token") != null) {
            sessionStorage.setItem("token", String(localStorage.getItem("token")));
        }
    }, [])
    return (
        <div className="flex items-center justify-center h-screen" style={{ height: '100vh', width: "100vw", backgroundColor: "#1f4c91" }}>
            {viewFP ? <ForgotScreen /> : viewLogin ? <LoginForm flip={flip} FP={setViewFP} /> : <SignupForm flip={flip} />}
        </div>
    )
}

//#1e4d91

export default AuthScreen