import React, { useEffect, useState } from 'react'
import '../App.css'
import Hero from '../components/Hero'
import Features from '../components/Features'
import bgVideo from '../assets/bg.mp4'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/slices/userSlice'

function Landing() {
    const dispatch = useDispatch()
    const [userLogged, setuserLogged] = useState(false)


    const verifyUser = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem('authToken')
                },
                credentials: 'include'
            })

            const data = await res.json()

            if (res.ok) {
                // toast.success(data?.message)
                dispatch(setUserData(data?.response))
                setuserLogged(true)
            } else {
                // toast.error(data?.message)
                setuserLogged(false)
                dispatch(setUserData({}))
            }
        } catch (e) {
            // toast.error(e?.message)
        }
    }

    useEffect(() => {
        verifyUser()
    }, [])
    return (
        <>
            <div className='relative'>
                <div className='max-w-[1200px] mx-auto'>
                    <Hero userLogged={userLogged} />
                </div>

                <video loop autoPlay muted className='w-full h-full absolute top-0 left-0 object-cover z-0 opacity-5'>
                    <source src={bgVideo} />
                </video>
            </div>
            <div className='max-w-[1200px] mx-auto z-100'>
                <Features />
            </div>
        </>
    )
}

export default Landing
