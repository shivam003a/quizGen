import React from 'react'

const Loading = ({ full, bg, large, ai }) => {
    return (
        <div className={`${full ? 'w-full h-screen' : ''} ${bg ? 'bg-[white]' : 'bg-transparent'} flex flex-col items-center justify-center`}>
            <div className={`${large ? "w-12 h-12 border-8 border-r-cs-blue" : 'w-6 h-6 border-4 border-r-black'} rounded-[50%] border-[#c3c0c0] border-r-black rotate`}></div>
            {ai && <span className='text-2xl font-poppins mt-4 text-cs-gray'>Sit back, and relax. We are generating quiz for you</span>}
        </div>
    )
}

export default Loading
