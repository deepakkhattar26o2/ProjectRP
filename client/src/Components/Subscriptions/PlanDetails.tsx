import axios from "axios";
import { useEffect } from "react";

export default function PlanDetails() {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/plan/details`, { headers: { 'authorization': token } }).then(({ data }) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div className=" h-72 flex justify-between bg-white shadow-md border border-gray-200 rounded-xl " style={{ width: "50vw" }}>
        </div>
    )
}
