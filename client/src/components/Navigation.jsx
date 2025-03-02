import React from 'react'
import { useNavigate } from 'react-router';
import { IoMdHome } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { IoCreateSharp } from "react-icons/io5";

const Navigation = () => {
    const navigate = useNavigate()

    return (
        <div className='flex items-center justify-center gap-8 bg-white w-fit py-2 px-4 rounded-3xl border border-cs-blue fixed bottom-4 left-1/2 -translate-x-1/2'>
            <div
                onClick={() => navigate('/q/list')}
                className='hover:scale-120'
            >
                <IoMdHome size={28} color='#6C63FF' />
            </div>
            <div
                onClick={() => navigate('/q/dashboard')}
                className='hover:scale-120'
            >
                <MdDashboard size={28} color='#6C63FF' />
            </div>
            <div
                onClick={() => navigate('/q/create')}
                className='hover:scale-120'
            >
                <IoCreateSharp size={28} color='#6C63FF' />
            </div>
        </div>
    )
}

export default Navigation
