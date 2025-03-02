import React from 'react'
import { FaEdit, FaRobot } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Create = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full min-h-screen flex items-center justify-center p-2'>
            <div className='w-6/10 flex flex-col items-center justify-center gap-4 md:w-4/10 md:flex-row'>
                <div
                    className='flex-1/2 p-4 flex flex-col gap-3 self-stretch bg-[#F7F6FF] shadow hover:bg-blue-100 hover:scale-105'
                    onClick={() => navigate('/q/create/manual')}
                >
                    <div><FaEdit size={36} color='#6C63FF' /></div>
                    <span className='font-poppins text-2xl font-light text-cs-blue'>Create Quiz Manually</span>
                    <span className='font-poppins text-sm font-light text-cs-gray'>Design your quiz from scratch. Add questions, set difficulty, and customize every detail</span>
                </div>
                <div
                    className='flex-1/2 p-4 flex flex-col gap-3 self-stretch bg-[#F7F6FF] shadow hover:bg-blue-100 hover:scale-105'
                    onClick={() => navigate('/q/create/ai')}
                >
                    <div><FaRobot size={36} color='#6C63FF' /></div>
                    <span className='font-poppins text-2xl font-light text-cs-blue'>Create Quiz with AI</span>
                    <span className='font-poppins text-sm font-light text-cs-gray'>Let AI generate a quiz for you. Save time and get a professionally crafted quiz in seconds</span>
                </div>
            </div>
        </div>
    )
}

export default Create
