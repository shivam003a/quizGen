import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Loading from './Loading'

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
            toast.error(e?.message)
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
                    <span className='text-3xl font-poppins font-semibold text-cs-blue'>Quizzes</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-8 p-2 overflow-x-hidden">
                        {
                            quizList.length > 0 && Array(200).fill({ i: 'dff' })?.map((quiz, index) => {
                                return (
                                    <div className='w-full bg-blue-100 shadow-md p-4 flex flex-col justify-center items-start gap-4'>
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
                            })
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default Quiz
