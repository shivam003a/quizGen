import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router'
import Loading from './Loading'

const Header = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signout`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('authToken')
                },
                credentials: 'include'
            })

            const data = await res.json()

            if (res?.ok) {
                localStorage.setItem('authToken', "")
                toast.success(data?.message)
                navigate('/signin')
            } else {
                localStorage.setItem('authToken', '')
                toast.error(data?.message)
                navigate('/signin')
            }

            setLoading(false)

        } catch (e) {
            toast.error(e?.message)
            setLoading(false)
        }
    }
    return (
        <div className='w-full h-17 fixed top-0 bg-[#F7F6FF] shadow-md'>
            <div className='max-w-[1200px] mx-auto px-2 py-3 flex items-center justify-between'>
                <NavLink to={'/'} className='font-honk text-4xl'>quizGen</NavLink>
                <span
                    className='font-poppins font-light underline cursor-pointer'
                    onClick={handleLogout}
                >
                    {loading ? (<Loading />) : ('Logout')}
                </span>
            </div>
        </div>
    )
}

export default Header
