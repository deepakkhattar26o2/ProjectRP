import AuthScreen from "./Components/Auth/AuthScreen"
import 'react-toastify/dist/ReactToastify.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CurrentPlanScreen from "./Components/Subscriptions/CurrentPlanScreen";
import AllPlans from "./Components/Subscriptions/AllPlans";
import { AuthProvider } from "./AuthContext";

const promise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/home" element={<CurrentPlanScreen />} />
            <Route path="/view" element={<Elements stripe={promise}><AllPlans /></Elements>} />
            <Route path='/*' element={<AuthScreen />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
