import React, { useState } from 'react'
import { NavLink } from 'react-router'
import landingSvg from '../assets/landing.svg'
import bgVideo from '../assets/bg.mp4'
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='flex items-center gap-4 min-h-screen'>
            <div className='flex-1/2 h-full bg-tran flex flex-col justify-center items-between gap-3 z-10 px-4'>
                <span className='w-fit text-8xl font-honk mb-2 typewriter'>
                    quizGen
                </span>
                <p className='text-3xl font-bold font-montserrat text-black'>
                    Generate & Attempt AI-Powered Quizzes Instantly!
                </p>
                <p className='text-lg font-montserrat text-cs-gray'>
                    Create quizzes on any topic with AI or challenge yourself with existing quizzes. Learning made fun and effortless!
                </p>
                <div className='flex flex-row gap-3 mt-4'>
                    <span to='#' className='flex items-center gap-2 px-4 py-2 bg-cs-blue text-white font-bold rounded-4xl cursor-pointer'
                        onClick={() => setOpen(true)}
                    >
                        Get Started
                        <FaArrowRight />
                    </span>
                    <span to='#' className='px-4 py-2 bg-blue-200 rounded-4xl cursor-pointer'>
                        Get Demo
                    </span>
                </div>
            </div>
            <div className='flex-1/2'>
                <img src={landingSvg} className='w-9/12 h-9/12' />
            </div>

            <video loop autoPlay muted className='w-full h-full absolute top-0 left-0 object-cover z-0 opacity-5'>
                <source src={bgVideo} />
            </video>
        </div>
    )
}

export default Hero
