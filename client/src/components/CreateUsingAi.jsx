import React, { useState } from 'react'
import createAiImg from '../assets/ai.jpg'
import { FaBook, FaChartBar, FaListOl } from 'react-icons/fa'
import { FaEnvelopeOpenText } from "react-icons/fa6";
import toast from 'react-hot-toast'
import Loading from './Loading'
import { useNavigate } from 'react-router'

const optionMapping = {
    "0": 'a',
    "1": 'b',
    "2": 'c',
    "3": 'd'
}

const CreateUsingAi = () => {
    const navigate = useNavigate()

    const [topic, setTopic] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [noOfQuestion, setNoOfQuestion] = useState('')
    const [loading, setLoading] = useState(false)
    const [quiz, setQuiz] = useState([])
    const [userPrompt, setUserPrompt] = useState('')

    const handleGenerate = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    topic,
                    difficulty,
                    noOfQuestion,
                    userPrompt
                }),
                credentials: 'include'
            })

            const data = await res.json()

            if (res?.ok) {
                setQuiz(data?.data?.questions)
                toast.success(data?.message)
            } else {
                toast.error(data?.message)
            }

        } catch (e) {
            toast.error(e?.message || "Something went wrong")
            setLoading(false)
        }
        setLoading(false)
    }

    return (
        <div className='w-full min-h-screen overflow-x-hidden'>
            {loading ? (<Loading full={true} large={true} ai={true} />) : (
                quiz.length === 0 ? (
                    <div className='max-w-[1200px] w-full min-h-screen flex flex-col sm:flex-row items-center justify-center mx-auto mt-20 gap-3 p-3 pb-8'>
                        <div className='flex-1/2'>
                            <img src={createAiImg} className='w-full sm:w-3/5 mx-auto' />
                        </div>
                        <div className='flex-1/2 flex flex-col justify-center items-start gap-2'>
                            <span className='font-poppins text-cs-blue text-3xl font-semibold'>Create Quiz using AI</span>
                            <span className='font-poppins font-light text-cs-gray'>Let AI generate a quiz for you in seconds. Just fill in the details below!</span>

                            <div className='flex items-center justify-start gap-4 p-2 self-stretch border-b border-cs-gray mt-6'>
                                <FaBook color='#777777' />
                                <input
                                    type='text'
                                    name='topic'
                                    placeholder='Enter Quiz Topic'
                                    className='w-full border-0 outline-0 font-poppins font-light text-sm'
                                    value={topic}
                                    onChange={(e) => setTopic(e?.target?.value)}
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
                                <div className='flex-1/2 flex items-center justify-start gap-4 p-2 self-stretch border-b border-cs-gray mt-3'>
                                    <FaListOl color='#777777' />
                                    <select className='w-full outline-0 border-0 text-cs-gray text-sm' value={noOfQuestion} onChange={(e) => setNoOfQuestion(e?.target?.value)}>
                                        <option value={''} defaultValue={''}>Number of Question</option>
                                        <option value={"10"}>10</option>
                                        <option value={"15"}>15</option>
                                        <option value={"20"}>20</option>
                                        <option value={"25"}>25</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex items-center justify-start gap-4 p-2 self-stretch border-b border-cs-gray mt-6'>
                                <FaEnvelopeOpenText color='#777777' />
                                <input
                                    type='text'
                                    name='topic'
                                    placeholder='Enter Optional Prompt'
                                    className='w-full border-0 outline-0 font-poppins font-light text-sm'
                                    value={userPrompt}
                                    onChange={(e) => setUserPrompt(e?.target?.value)}
                                />
                            </div>

                            <button className='font-poppins py-3 px-4 rounded-4xl mt-10 w-35 text-white mx-auto bg-cs-blue text-center' onClick={handleGenerate}>Generate</button>

                        </div>
                    </div>
                ) : (
                    <div className='max-w-[1200px] w-full min-h-screen flex flex-col items-start justify-center mx-auto mt-20 gap-3 p-3 pb-16 -z-10'>
                        <div className='flex items-center justify-between text-3xl font-poppins text-cs-blue w-full'>
                            <span>Here is raw version of ai generated quiz</span>
                            <button
                                className='ml-6 font-poppins py-3 px-4 rounded-4xl text-white mx-auto bg-cs-blue text-center'
                                style={{ fontSize: '16px' }}
                                onClick={() => {
                                    navigate('/q/list')
                                    setQuiz([])
                                }}>Go to Quiz List</button>
                        </div>
                        <div className='bg-[#ececec] px-4 py-4 flex flex-col gap-3 items-start justify-center'>
                            {
                                quiz?.length > 0 && quiz.map((q, index) => (
                                    <div key={index} className='flex flex-col items-start justify-center gap-2'>
                                        <span className='font-poppins'>{index + 1}. {q?.question}</span>
                                        <div className='flex flex-col ml-6'>
                                            {
                                                q?.options?.length > 0 && q?.options?.map((options, i) => (
                                                    <span key={i} className='font-poppins font-light'>{optionMapping[i]}{")"}. {options}</span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default CreateUsingAi
