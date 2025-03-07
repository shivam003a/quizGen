import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'

const AttemptQuiz = () => {
    const { id } = useParams()
    const [quiz, setQuiz] = useState()
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [userSelectedAns, setUserSelectedAns] = useState([])
    const [userScore, setUserScore] = useState(0)

    const fetchQuizById = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/get/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('authToken')
                }
            })

            const data = await res.json()

            if (res?.ok) {
                toast.success(data?.message)
                setQuiz(data?.response)
                setQuestions(data?.response?.questions)
            } else {
                toast.error(data?.message)
                setUserSelectedAns([])
            }
        } catch (e) {
            toast.error(e?.message)
        }
    }

    useEffect(() => {
        fetchQuizById()
        setUserSelectedAns([])
    }, [id])

    const handlePrev = () => {
        setCurrentQuestion((prev) => (
            Math.max(prev - 1, 0)
        ))
    }

    const handleNext = () => {
        setCurrentQuestion((prev) => (
            Math.min(prev + 1, quiz?.noOfQuestion - 1)
        ))
    }

    const handleSelectOption = (option) => {
        const userSeelctionArr = [...userSelectedAns]
        userSeelctionArr[currentQuestion] = option
        setUserSelectedAns(userSeelctionArr)
        const isCorrect = questions[currentQuestion]?.correctAnswer === option
        if (isCorrect) {
            setUserScore((prev) => prev + 1)
        }
    }

    const handleSubmitQuiz = async (e) => {
        e.preventDefault()

        try {
            const body = {
                userScore,
                userSelectedAns,
                quizId: id,
                userId: '67c31cbe728de79550b6f69f'
            }

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/submit`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem('authToken')
                },
                body: JSON.stringify(body)
            })

            const data = await res.json()

            if (res.ok) {
                toast.success(data?.message)
            } else {
                toast.error(data?.message)
            }
        } catch (e) {
            toast.error(e?.message)
        }
    }

    return (
        <div className='w-full mt-16'>
            <div className='max-w-[1200px] h-[calc(100vh-68px)] mx-auto p-4 flex flex-col gap-8 justify-between'>
                <span className='text-3xl font-poppins font-light mt-4'>{questions[currentQuestion]?.question}</span>
                <div className='mb-16'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-2 overflow-x-hidden">
                        {
                            questions[currentQuestion]?.options?.map((option, index) => {
                                const optionLetter = String.fromCharCode(65 + index)
                                const isSelected = userSelectedAns[currentQuestion] === optionLetter
                                const isCorrect = questions[currentQuestion]?.correctAnswer === optionLetter
                                const bgColor = isSelected ? (isCorrect ? "bg-green-300" : "bg-red-300") : "bg-red-100";
                                return (
                                    <span
                                        key={index}
                                        className={`${bgColor} py-4 px-4 font-poppins font-light text-center cursor-pointer`}
                                        onClick={() => handleSelectOption(optionLetter)}
                                    >
                                        {option}
                                    </span>
                                )
                            })
                        }
                    </div>
                    <div className='flex px-2 justify-between items-center mt-2'>
                        <div>
                            <button className='bg-cs-blue text-white px-4 py-2 font-poppins font-light'
                                onClick={handleSubmitQuiz}
                            >Submit</button>
                        </div>
                        <div className='flex gap-2'>
                            <button className={`bg-cs-blue text-white px-4 py-2 font-poppins font-light ${currentQuestion === 0 ? 'cursor-not-allowed bg-cs-gray' : 'cursor-pointer'}`} onClick={handlePrev}>Prev</button>
                            <button className={`bg-cs-blue text-white px-4 py-2 font-poppins font-light ${currentQuestion === quiz?.noOfQuestion - 1 ? 'cursor-not-allowed bg-cs-gray' : 'cursor-pointer'}`} onClick={handleNext}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttemptQuiz
