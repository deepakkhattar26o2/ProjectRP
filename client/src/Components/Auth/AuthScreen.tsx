import { useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import ForgotScreen from "./ForgotScreen";

function AuthScreen() {
    const [viewLogin, setViewLogin] = useState(false)
    const [viewFP, setViewFP] = useState(false);
    const flip = () => {
        setViewLogin(!viewLogin);
    }
    return (
        <div className="flex items-center justify-center h-screen bg-[#023faa]" style={{ height: '100vh', width: "100vw" }}>
            {viewFP ? <ForgotScreen /> : viewLogin ? <LoginForm flip={flip} FP = {setViewFP} /> : <SignupForm flip={flip} />}
        </div>
    )
}

export default AuthScreen