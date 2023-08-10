import axios from "axios"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AllPlans({ logout }: any) {
    const [plans, setPlans] = useState([]);
    const getAllPlans = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/plan/all`, {
            headers: {
                authorization: sessionStorage.getItem('token') || localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setPlans(data.plans);
        }).catch((err) => {
            console.log("Something went wrong with fetching plan details!")
            if (err.response?.data?.message) {
                toast.error(err.response?.data?.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        })
    }
    useEffect(() => {
        getAllPlans();
    }, [])
    interface ListElement {
        ele: Plan
    }
    const Title = ({ ele }: ListElement) => {
        return <th scope="col">
            <h2 className="px-2 text-lg font-medium">{ele.name}</h2>
        </th>
    }

    const Element = (ele : any)=>{
        return <td>
            <span className="block text-sm">{ele}₹</span>
        </td>
    }
    
    const Devices = ({ ele }: ListElement) => {
        let list = ele.devices.split('+');

        return <td>
            <span className="block text-sm">{list.join('\r\n')}</span>
        </td>
    }
    return (

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 className="font-bold text-2xl ">Choose the right plan for you</h1>
            <section style={{ width: "50vw" }} className="dark:bg-gray-800 dark:text-gray-100">
                <div className="container mx-auto p-6 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>
                                    Heyyy
                                </th>
                                {plans.map((ele: Plan) => { return <Title ele={ele} /> })}
                            </tr>
                        </thead>
                        <tbody className="space-y-6 text-center divide-y divide-gray-700">
                            <tr>
                                <th scope="row" className="text-left">
                                    <h3 className="py-3">Price</h3>
                                </th>
                                {plans.map((ele: Plan) => { return <Element ele={ele.monthly_price} /> })}
                            </tr>
                            <tr>
                                <th scope="row" className="text-left">
                                    <h3 className="py-3">Video Quality</h3>
                                </th>
                                {plans.map((ele: Plan) => { return <Element ele={ele.video_quality} /> })}
                            </tr>
                            <tr>
                                <th scope="row" className="text-left">
                                    <h3 className="py-3">Video Resolution</h3>
                                </th>
                                {plans.map((ele: Plan) => { return <Element ele={ele.resolution} /> })}

                            </tr>
                            <tr>
                                <th scope="row" className="text-left">
                                    <h3 className="py-3">Active Screens at a time</h3>
                                </th>
                                {plans.map((ele: Plan) => { return <Element ele={ele.number_of_active_screens} /> })}

                            </tr>
                            <tr>
                                <th scope="row" className="text-left">
                                    <h3 className="py-3">Devices you can use to watch</h3>
                                </th>
                                {plans.map((ele: Plan) => { return <Devices ele={ele} /> })}

                            </tr>

                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default AllPlans