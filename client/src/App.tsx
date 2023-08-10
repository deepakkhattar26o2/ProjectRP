import AuthScreen from "./Components/Auth/AuthScreen"
import 'react-toastify/dist/ReactToastify.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import PaymentScreen from "./Components/Subscriptions/PaymentScreen";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CurrentPlanScreen from "./Components/Subscriptions/CurrentPlanScreen";
const promise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || sessionStorage.getItem("token"))
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
  return (
    <div>
      <Router>
        {token ?
          <Routes>
            <Route path="/payment" element={
              <Elements stripe={promise}>
                <PaymentScreen logout={logout} />
              </Elements>

            } />
            <Route path="/*" element={<CurrentPlanScreen/>}/>
          </Routes>
          :
          <Routes>
            <Route path="/" element={<AuthScreen />} />
          </Routes>
        }
      </Router>
    </div>
  )
}

export default App
