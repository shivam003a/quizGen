import React, { useState } from 'react'
import { FaArrowAltCircleRight } from "react-icons/fa";
import moment from 'moment'
import { useNavigate } from 'react-router';

const QuizCard = ({ quiz }) => {
    const navigate = useNavigate()
    const [hovered, setHovered] = useState(false)
    const { topic, createdBy, createdAt, noOfQuestion, difficulty } = quiz;

    // Capitalize the first letter of the difficulty
    const capitalizedDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    return (
        <div className='w-full bg-[#F7F6FF] p-4 flex flex-col justify-center items-start gap-4 shadow'>
            <span className='font-poppins text-2xl font-semibold text-cs-blue capitalize'>{topic}</span>
            <div className='flex flex-col items-start justify-center gap-1 -mt-3'>
                {/* <span className='font-poppins text-cs-blue'>createdBy:</span> */}
                <span className='font-poppins font-light text-cs-gray text-sm'>{createdBy}</span>
                <span className='font-poppins font-light text-cs-gray text-sm'>{moment(createdAt).format('hh/MM/yyyy')}</span>
            </div>
            <div className='w-full flex items-center justify-between'>
                <span className='font-poppins font-light py-[1px] px-4 bg-cs-blue text-white'>{noOfQuestion}</span>
                <span className={`font-poppins font-light py-[1px] px-4 text-white ${capitalizedDifficulty === 'Easy' ? ('bg-[#10B981]') : (capitalizedDifficulty === 'Medium' ? ('bg-[#F59E0B]') : ('bg-[#EF4444]'))}`}>{capitalizedDifficulty}</span>
            </div>
            <div className='w-full border border-[#e6e4e4]'></div>
            <div className='w-full flex justify-end' onClick={() => navigate(`/q/list/${quiz?._id}`)}>
                <FaArrowAltCircleRight
                    color={`${hovered ? '#6C63FF' : '#c7c4c4'}`}
                    size={24}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className='cursor-pointer'
                />
            </div>
        </div>
    )
}

export default QuizCard
