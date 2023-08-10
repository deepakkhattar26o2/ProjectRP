import { useState } from "react"
import ForgotPassword from "./ForgotPassword";
import OtpScreen from "./OtpScreen";
import UpdatePassword from "./UpdatePassword";

export default function ForgotScreen() {
    const [otp, setOtp] = useState(null);
    const [email, setEmail] = useState(null);
    const [flip, setFlip] = useState(false)
    return (
        <div className="flex items-center justify-center h-screen bg-[#023faa]" style={{ height: '100vh', width: "100vw" }}>
            {flip ? <UpdatePassword email={email}/> :  otp ? <OtpScreen otp={otp} flip={setFlip} /> : <ForgotPassword setOtp={setOtp} setFemail={setEmail} />}
        </div>
    )
}