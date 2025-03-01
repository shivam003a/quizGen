import React from 'react'

const Loading = ({ full, bg, large }) => {
    return (
        <div className={`${full ? 'w-full h-screen' : ''} ${bg ? 'bg-[white]' : 'bg-transparent'} flex items-center justify-center`}>
            <div className={`${large ? "w-12 h-12 border-8 border-r-cs-blue" : 'w-6 h-6 border-4 border-r-black'} rounded-[50%] border-[#c3c0c0] border-r-black rotate`}></div>
        </div>
    )
}

export default Loading
