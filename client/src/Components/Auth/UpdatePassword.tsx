import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdatePassword({ email }: any) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setCpassword] = useState('')
    const navigate = useNavigate()
    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (password == confirmPassword) {
            axios.patch(`${import.meta.env.VITE_API_URL}/user/verified`, {
                email : email,
                password : password
            }).then(
                ()=>{
                    toast.success("Password changed successfully!", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                        navigate('/home')
                    
                }
            ).catch((err)=>{
                if(err.response?.data?.message){
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
                else{
                    console.log("something went wrong!")
                }
            })
        }
        else {
            toast.error('Passwords do not match!', {
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
    }
    return (
        <div className="w-2/4 bg-white shadow-md border border-gray-200 rounded-2xl max-w-sm p-4 sm:p-6 lg:p-8">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h4 className="mt-10 text-center text-xl font-bold  leading-9 tracking-tight text-gray-900">
                        Enter your new password
                    </h4>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={(e) => { handlePasswordUpdate(e) }} className="space-y-4">
                        <div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="New Password"
                                    autoComplete="password"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => { setCpassword(e.target.value) }}
                                    id="cpassword"
                                    name="cpassword"
                                    type="cpassword"
                                    placeholder="Confirm your password"
                                    autoComplete="cpassword"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#023faa] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}