import { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
export default function LoginForm({ flip , FP}: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false)
    const auth = useAuth();
    const navigate = useNavigate();
    const sendLoginRequest = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
            email: email,
            password: password
        }).then(({ data }) => {
            if (rememberMe && data.token) {
                localStorage.setItem("token", data.token);
            }
            auth?.login(data.token);
            navigate('/home', {replace : true});
            //navigate to home screen
        }).catch((err) => { 
            console.log("Something went wrong with Login!") 
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
         })
    }
    return (
        <div className=" bg-white shadow-md border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-6" style={{width: "25vw"}}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-4 lg:px-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h4 className="mt-10 text-center text-xl font-bold  leading-9 tracking-tight text-gray-900">
                        Login to your account
                    </h4>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={(e) => { sendLoginRequest(e) }}>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a onClick={(e)=>{e.preventDefault; FP(true)}} className="font-semibold text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex items-center mb-4">
                                
                            <input  onClick={() => { setRememberMe(!rememberMe) }} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium ">Remember Me</label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#023faa] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        New to MyApp?{' '}
                        <a onClick={(e) => { e.preventDefault(); flip() }} className="font-semibold leading-6 text-indigo-600 hover:cursor-pointer hover:text-indigo-500">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
