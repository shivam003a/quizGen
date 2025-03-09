import React, { useState } from 'react'
import { FaBook, FaChartBar, FaListOl } from 'react-icons/fa'
import QuestionCard from './QuestionCard'

const CreateUsingManual = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [timeLimit, setTimeLimit] = useState('')
    const [tags, setTags] = useState('')
    const [questions, setQuestions] = useState([{
        question: '',
        options: [],
        correctAnswer: '',
        explanation: ''
    }])

    const handlAddMore = () => {
        setQuestions((prev) => ([...prev, {
            question: '',
            options: [],
            correctAnswer: '',
            explanation: ''
        }]))
    }
    return (
        <div className='w-full min-h-screen overflow-x-hidden'>
            <div className='max-w-[1200px] w-full min-h-screen flex flex-col sm:flex-col items-start justify-start mx-auto mt-20 gap-3 p-3 pb-8'>
                <span className='font-poppins text-cs-blue text-3xl font-semibold'>Create Quiz Manually</span>

                <div className='flex items-start justify-center w-full gap-4'>
                    <div className='m-4 flex-1/2'>
                        <span className='text-cs-blue font-poppins font-md'>Quiz Details</span>
                        <div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                            <FaBook color='#777777' />
                            <input
                                type='text'
                                name='title'
                                placeholder='Enter Quiz Title'
                                className='w-full border-0 outline-0 font-poppins font-light text-sm'
                                value={title}
                                onChange={(e) => setTitle(e?.target?.value)}
                            />
                        </div>
                        <div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                            <FaBook color='#777777' />
                            <input
                                type='text'
                                name='description'
                                placeholder='Enter Quiz Description'
                                className='w-full border-0 outline-0 font-poppins font-light text-sm'
                                value={description}
                                onChange={(e) => setDescription(e?.target?.value)}
                            />
                        </div>
                        <div className='flex w-full items-center justify-center gap-3 mt-2'>
                            <div className='flex-1/2 flex items-center justify-start gap-4 p-2 self-stretch border-b border-cs-gray mt-3'>
                                <FaChartBar color='#777777' />
                                <select className='w-full outline-0 border-0 text-cs-gray text-sm' value={difficulty} onChange={(e) => setDifficulty(e?.target?.value)}>
                                    <option value={''} defaultValue={''}>Select Difficulty</option>
                                    <option value={"easy"}>Easy</option>
                                    <option value={"medium"}>Medium</option>
                                    <option value={"hard"}>Hard</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                            <FaBook color='#777777' />
                            <input
                                type='text'
                                name='timeLimit'
                                placeholder='Enter Time Limit (in seconds)'
                                className='w-full border-0 outline-0 font-poppins font-light text-sm'
                                value={timeLimit}
                                onChange={(e) => setTimeLimit(e?.target?.value)}
                            />
                        </div>
                        <div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                            <FaBook color='#777777' />
                            <input
                                type='text'
                                name='tags'
                                placeholder='Enter Tags (seperated by comma)'
                                className='w-full border-0 outline-0 font-poppins font-light text-sm'
                                value={tags}
                                onChange={(e) => setTags(e?.target?.value)}
                            />
                        </div>
                    </div>
                    <div className='h-30 border'></div>
                    <div className='flex-1/2 m-4'>
                        <span className='text-cs-blue font-poppins font-md'>Questions</span>
                        {questions?.length > 0 && questions?.map((q, index) => (
                            <QuestionCard quizQuestion={q} />
                        ))}
                        <button className='px-2 py-1 bg-cs-blue text-white mt-2 self-end' onClick={handlAddMore}>Add More</button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateUsingManual
