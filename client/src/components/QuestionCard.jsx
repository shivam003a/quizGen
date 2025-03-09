import React, { useState } from 'react'
import { FaBook, FaChartBar, FaListOl } from 'react-icons/fa'

const QuestionCard = () => {
    const [timeLimit, setTimeLimit] = useState('')
    const [difficulty, setDifficulty] = useState('')
    return (
        <div className='bg-red-50 px-1'>
            <div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                <FaBook color='#777777' />
                <input
                    type='text'
                    name='timeLimit'
                    placeholder='Enter Question'
                    className='w-full border-0 outline-0 font-poppins font-light text-sm'
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e?.target?.value)}
                />
            </div>
            <div className='flex items-center justify-center gap-2'>
                <div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                    <FaBook color='#777777' />
                    <input
                        type='text'
                        name='timeLimit'
                        placeholder='Option 1'
                        className='w-full border-0 outline-0 font-poppins font-light text-sm'
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(e?.target?.value)}
                    />
                </div><div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                    <FaBook color='#777777' />
                    <input
                        type='text'
                        name='timeLimit'
                        placeholder='Option 2'
                        className='w-full border-0 outline-0 font-poppins font-light text-sm'
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(e?.target?.value)}
                    />
                </div><div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                    <FaBook color='#777777' />
                    <input
                        type='text'
                        name='timeLimit'
                        placeholder='Option 3'
                        className='w-full border-0 outline-0 font-poppins font-light text-sm'
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(e?.target?.value)}
                    />
                </div><div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                    <FaBook color='#777777' />
                    <input
                        type='text'
                        name='timeLimit'
                        placeholder='Option 4'
                        className='w-full border-0 outline-0 font-poppins font-light text-sm'
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(e?.target?.value)}
                    />
                </div>
            </div>
            <div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                <FaBook color='#777777' />
                <input
                    type='text'
                    name='timeLimit'
                    placeholder='Enter Explanation'
                    className='w-full border-0 outline-0 font-poppins font-light text-sm'
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(e?.target?.value)}
                />
            </div>
            <div className='flex w-full items-center justify-center gap-3 mt-2'>
                <div className='flex-1/2 flex items-center justify-start gap-4 p-2 self-stretch border-b border-cs-gray mt-3'>
                    <FaChartBar color='#777777' />
                    <select className='w-full outline-0 border-0 text-cs-gray text-sm' value={difficulty} onChange={(e) => setDifficulty(e?.target?.value)}>
                        <option value={''} defaultValue={''}>Correct Answer</option>
                        <option value={"A"}>A</option>
                        <option value={"B"}>B</option>
                        <option value={"C"}>C</option>
                        <option value={"D"}>D</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default QuestionCard
