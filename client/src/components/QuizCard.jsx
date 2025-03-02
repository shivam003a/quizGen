import React from 'react'

const QuizCard = (quiz) => {
    return (
        <div className='w-full bg-[#F7F6FF] p-4 flex flex-col justify-center items-start gap-4'>
            <span className='font-poppins text-2xl font-semibold text-cs-blue capitalize'>{quiz?.topic || "testing"}</span>
            <div className='flex items-center justify-center gap-1 -mt-3'>
                {/* <span className='font-poppins text-cs-blue'>createdBy:</span> */}
                <span className='font-poppins font-light'>{quiz?.createdBy || "shivam"}</span>
            </div>
            <div className='w-full flex items-center justify-between'>
                <span className='font-poppins'>{quiz?.noOfQuestion || 5}</span>
                <span className='font-poppins '>{quiz?.difficulty || "Easy"}</span>
            </div>
        </div>
    )
}

export default QuizCard
