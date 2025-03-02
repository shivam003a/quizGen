import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Loading from './Loading'
import QuizCard from './QuizCard'

const Quiz = () => {
    const [quizList, setQuizList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchQuizList()
    }, [])

    async function fetchQuizList() {
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/get-all`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('authToken')
                },
                credentials: 'include'
            })

            const data = await res.json()

            if (res?.ok) {
                setQuizList(data?.response)
                toast.success(data?.message)
            } else {
                toast.error(data?.message)
            }

            setLoading(false)
        } catch (e) {
            toast.error(e?.message || "Something went wrong")
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? (
                <Loading
                    full={true}
                    large={true}
                    bg={true}
                />) : (
                <div className='w-full h-full px-2 py-4'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-2 overflow-x-hidden">
                        {
                            quizList.length > 0 && quizList?.map((quiz, index) => {
                                return (
                                    <QuizCard quiz={quiz} key={index} />
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default Quiz
