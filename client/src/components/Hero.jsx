import React, { useState } from 'react'
import { NavLink } from 'react-router'
import landingSvg from '../assets/landing.svg'
import bgVideo from '../assets/bg.mp4'
import { FaArrowRight } from "react-icons/fa";
import AuthDialog from './AuthDialog';

const Hero = () => {
    const [isGetStartedOpen, setIsGetStartedOpen] = useState(false)
    const [isDemoOpen, setIsDemoOpen] = useState(false)
    return (
        <div className='flex flex-col-reverse items-center gap-4 py-16 md:py-32 md:flex-row'>
            <div className='flex-1/2 h-full bg-tran flex flex-col justify-center items-between gap-3 z-10 px-4'>
                <div className='w-fit flex'>
                    <span className='w-full text-8xl font-honk mb-2 typewriter'>
                        quizGen
                    </span>
                </div>
                <p className='text-3xl font-bold font-montserrat text-black'>
                    Generate & Attempt AI-Powered Quizzes Instantly!
                </p>
                <p className='text-lg font-montserrat text-cs-gray'>
                    Create quizzes on any topic with AI or challenge yourself with existing quizzes. Learning made fun and effortless!
                </p>
                <div className='flex flex-row gap-3 mt-4'>
                    <span to='#' className='flex items-center gap-2 px-4 py-2 bg-cs-blue text-white font-bold rounded-4xl cursor-pointer'
                        onClick={() => setIsGetStartedOpen(true)}
                    >
                        Get Started
                        <FaArrowRight />
                    </span>
                    <span to='#' className='px-4 py-2 bg-blue-200 rounded-4xl cursor-pointer'
                        onClick={() => setIsDemoOpen(true)}
                    >
                        Get Demo
                    </span>
                </div>
            </div>
            <div className='flex-1/2 mt-8 md:mt-0'>
                <img src={landingSvg} className='w-9/12 h-9/12 mx-auto p-4' />
            </div>

            {
                isGetStartedOpen ? (
                    <AuthDialog
                        isOpen={isGetStartedOpen}
                        onClose={() => setIsGetStartedOpen(false)}
                        header='Get Started'
                        type="auth"
                    />
                ) : null
            }
            {
                isDemoOpen ? (
                    <AuthDialog
                        isOpen={isDemoOpen}
                        onClose={() => setIsDemoOpen(false)}
                        header='Product Demo'
                        type="demo"
                    />
                ) : null
            }

        </div>
    )
}

export default Hero
