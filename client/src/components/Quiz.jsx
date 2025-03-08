import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Loading from './Loading'
import QuizCard from './QuizCard'
import { MdSearch } from "react-icons/md";
import Pagination from './Pagination';
import noResult from '../assets/no_result.jpg'

const Quiz = () => {
    const [quizList, setQuizList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [createdByArr, setCreatedByArr] = useState([])
    const [loading, setLoading] = useState(false)

    // filtering
    const [searchKey, setSearchKey] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [creator, setCreator] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchQuizList()
    }, [page, creator, difficulty, search])

    async function fetchQuizList() {
        setLoading(true)
        try {
            const queryParams = new URLSearchParams({
                page: page || '',
                difficulty: difficulty || '',
                createdBy: creator || '',
                topic: search || ''
            })
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/get-all?${queryParams}`, {
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
                setTotalPages(data?.pagination?.totalPages)
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

    const getCreateByArr = async () => {
        if (!quizList) return []
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/get-creator`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('authToken')
                },
                credentials: 'include'
            })

            const data = await res.json()

            if (res?.ok) {
                setCreatedByArr(data?.response)
            } else {
                toast.error(data?.message)
            }

        } catch (e) {
            toast.error(e?.message || "Something went wrong")
        }
    }

    useEffect(() => {
        getCreateByArr()
    }, [])

    return (
        <>
            {loading ? (
                <Loading
                    full={true}
                    large={true}
                    bg={true}
                />) : (
                <div className='w-full h-full px-2 py-4 my-16'>

                    {/* filtering */}
                    <div className='flex flex-wrap items-center justify-between p-2 my-4 gap-2'>
                        {/* Search Input */}
                        <div className='flex items-center justify-center overflow-hidden'>
                            <input
                                type='text'
                                placeholder='Search by topic'
                                className='w-full sm:w-45 px-3 py-2 border text-sm font-poppins font-light border-cs-gray focus:outline-none'
                                onChange={(e) => setSearchKey(e?.target?.value)}
                                value={searchKey}
                            />
                            <button
                                className='px-3 py-2 bg-cs-blue'
                                onClick={() => {
                                    setSearch(searchKey)
                                    setPage(1)
                                }}
                            >
                                <MdSearch size={22} color='#FFFFFF' />
                            </button>
                        </div>

                        <div className='flex gap-4'>

                            <select
                                className='w-1/2 sm:w-auto px-3 py-2 border text-sm font-poppins font-light border-cs-gray focus:outline-none'
                                aria-label='Select Created By'
                                value={creator}
                                onChange={(e) => {
                                    setCreator(e?.target?.value)
                                    setPage(1)
                                }}
                            >
                                <option value='' disabled defaultValue>Select createdBy</option>
                                {createdByArr?.length > 0 && createdByArr?.map((creator, i) => (
                                    <option key={i} value={creator}>{creator}</option>
                                ))}
                            </select>

                            {/* Difficulty */}
                            <select
                                className='w-1/2 sm:w-auto px-3 py-2 border text-sm font-poppins font-light border-cs-gray focus:outline-none'
                                aria-label='Select Difficulty'
                                value={difficulty}
                                onChange={(e) => {
                                    setDifficulty(e?.target?.value)
                                    setPage(1)
                                }}
                            >
                                <option value="" disabled defaultValue>Select Difficulty</option>
                                <option value='easy'>Easy</option>
                                <option value='medium'>Medium</option>
                                <option value='hard'>Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-2 overflow-x-hidden">
                        {
                            quizList.length > 0 ? (quizList?.map((quiz, index) => {
                                return (
                                    <QuizCard quiz={quiz} key={index} />
                                )
                            })) : (
                                <div className="col-span-full flex flex-col items-center justify-center">
                                    <img src={noResult} alt="No results found" className="w-100 h-100" />
                                </div>
                            )
                        }
                    </div>
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </>
    )
}

export default Quiz
