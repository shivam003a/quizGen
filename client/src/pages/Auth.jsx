import React, { useState } from 'react'
import Loading from '../components/Loading'
import signupSvg from '../assets/signup.jpg'
import signinSvg from '../assets/login.jpg'
import { IoPersonSharp } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import signinBlob from '../assets/blob-1.svg'
import signupBlob from '../assets/blob-2.svg'
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Auth = ({ type = 'signin' }) => {
    const formDetails = {
        signup: [
            { name: 'fullname', type: 'text', placeholder: 'Full Name' },
            { name: 'email', type: 'email', placeholder: 'E-mail' },
            { name: 'password', type: 'password', placeholder: 'Password' }
        ],
        signin: [
            { name: 'email', type: 'email', placeholder: 'E-mail' },
            { name: 'password', type: 'password', placeholder: 'Password' },
        ]
    }

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleInput = (e) => {
        setFormData((prev) => ({
            ...prev, [e?.target?.name]: e?.target?.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            let res;
            if (type === 'signup') {
                res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: formData?.fullname?.split(' ')[0],
                        lastName: formData?.fullname?.split(' ')[1],
                        email: formData?.email,
                        password: formData?.password
                    })
                })
            }
            else {
                res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json',
                        "Accept": 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData?.email,
                        password: formData?.password
                    }),
                    credentials: 'include'
                })
            }

            const data = await res.json()
            if (res?.ok) {
                type === 'signup' ? navigate('/signin') : navigate('/q/list')
                localStorage.setItem('authToken', data?.authToken)
                toast.success(data?.message)
            } else {
                toast.error(data?.message)
            }
            setLoading(false)

        } catch (e) {
            toast.error(e?.message || "Something went wrong")
            setLoading(false)
        }
    }

    return (
        <div className='w-full min-h-screen overflow-hidden relative'>

            {/* background image */}
            {type === 'signup' ?
                <img src={signupBlob} className='absolute top-0 left-0 w-full h-full object-cover' /> :
                <img src={signinBlob} className='absolute top-0 left-0 w-full h-full object-cover' />
            }

            <div className='max-w-[1200px] min-h-screen mx-auto flex items-center justify-center relative'>

                {/* form div */}
                <div className='w-8/10 bg-white flex flex-col md:flex-row md:w-7/10 items-center justify-center gap-8 rounded-lg z-30 border border-[#e8e8e8] my-8'>

                    {/* left */}
                    <div className="flex-1/2">
                        <img
                            src={type === 'signup' ? signupSvg : signinSvg}
                        />
                    </div>

                    {/* right */}
                    <div className="flex-1/2 flex flex-col gap-2 px-4 py-8">
                        <span className={`font-poppins text-3xl text-center font-semibold ${type === 'signup' ? 'text-cs-blue' : 'text-cs-green'}`}>
                            {type === 'signup' ? 'Register Your Account Now' : 'Access Your Account Now'}
                        </span>
                        <p className='font-poppins text-md font-light text-cs-gray text-center'>
                            Get unlimited type of quiz, questions, and responsed
                        </p>
                        <div className='flex-col mt-4 flex gap-4'>
                            {formDetails[type]?.map((input, index) => (
                                <div key={index} className='flex items-center justify-start gap-4 p-2 self-stretch border-b border-cs-gray'>
                                    {
                                        input?.name === 'fullname' ?
                                            (<IoPersonSharp />) :
                                            (
                                                input?.name === 'email' ?
                                                    (<MdMailOutline />) :
                                                    (<MdLockOutline />)
                                            )
                                    }
                                    <input
                                        type={input?.type}
                                        name={input?.name}
                                        placeholder={input?.placeholder}
                                        className='w-full border-0 outline-0 font-poppins font-light text-sm'
                                        value={formData[input?.name]}
                                        onChange={handleInput}
                                    />
                                </div>
                            ))}
                            <button
                                className={`font-poppins py-3 px-4 rounded-4xl mt-8 w-35 text-white mx-auto ${type === 'signup' ? 'bg-cs-blue' : 'bg-cs-green'}`}
                                onClick={handleSubmit}
                            >
                                {loading ? <Loading /> : (type === 'signup' ? 'SignUp' : 'SignIn')}
                            </button>
                        </div>
                        {type === 'signup' ? (
                            <span className='font-poppins font-light mx-auto mt-2 text-center'>
                                Already have an account?
                                <span className='text-cs-blue cursor-pointer'
                                    onClick={() => navigate('/signin')}
                                >
                                    &nbsp;Login
                                </span>
                            </span>
                        ) : (
                            <span className='font-poppins font-light mx-auto mt-2 text-center'>
                                Don't have an account?
                                <span className='text-cs-green cursor-pointer'
                                    onClick={() => navigate('/signup')}
                                >
                                    &nbsp;Register
                                </span>
                            </span>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Auth