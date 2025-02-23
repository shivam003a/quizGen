import React from 'react'
import '../App.css'
import Hero from '../components/Hero'
import Features from '../components/Features'

function Landing() {
    return (
        <>
            <div className='max-w-[1200px] mx-auto'>
                <Hero />
            </div>
            <div className='max-w-[1200px] min-h-screen mx-auto'>
                <Features />
            </div>
        </>
    )
}

export default Landing
