import React from 'react'
import '../App.css'
import Hero from '../components/Hero'
import Features from '../components/Features'
import bgVideo from '../assets/bg.mp4'

function Landing() {
    return (
        <>
            <div className='relative'>
                <div className='max-w-[1200px] mx-auto'>
                    <Hero />
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
