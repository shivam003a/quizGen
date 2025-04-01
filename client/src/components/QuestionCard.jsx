import React, { useState } from 'react'
import { FaBook, FaChartBar, FaListOl } from 'react-icons/fa'

const QuestionCard = ({ index, setQuestions, quizQuestion, questions }) => {

    const handleInput = (e, index) => {
        const { name, value } = e?.target
        const newQuestions = [...questions]

        if (name === 'questionTitle') {
            newQuestions[index].question = value
        } else if (name === 'options1') {
            newQuestions[index].options[0] = value
        } else if (name === 'options2') {
            newQuestions[index].options[1] = value
        } else if (name === 'options3') {
            newQuestions[index].options[2] = value
        } else if (name === 'options4') {
            newQuestions[index].options[3] = value
        } else if (name === 'explanation') {
            newQuestions[index].explanation = value
        } else if (name === 'correctAnswer') {
            newQuestions[index].correctAnswer = value
        }
        setQuestions(newQuestions)
    }

    return (
        <div className='bg-red-50 px-1'>
            <div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                <FaBook color='#777777' />
                <input
                    type='text'
                    name='questionTitle'
                    placeholder='Enter Question'
                    className='w-full border-0 outline-0 font-poppins font-light text-sm'
                    value={questions[index]?.question || ""}
                    onChange={(e) => handleInput(e, index)}
                />
            </div>
            <div className='flex items-center justify-center gap-2'>
                <div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                    <FaBook color='#777777' />
                    <input
                        type='text'
                        name='options1'
                        placeholder='Option 1'
                        className='w-full border-0 outline-0 font-poppins font-light text-sm'
                        value={questions[index]?.options[0] || ""}
                        onChange={(e) => handleInput(e, index)}
                    />
                </div><div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                    <FaBook color='#777777' />
                    <input
                        type='text'
                        name='options2'
                        placeholder='Option 2'
                        className='w-full border-0 outline-0 font-poppins font-light text-sm'
                        value={questions[index]?.options[1] || ""}
                        onChange={(e) => handleInput(e, index)}
                    />
                </div><div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                    <FaBook color='#777777' />
                    <input
                        type='text'
                        name='options3'
                        placeholder='Option 3'
                        className='w-full border-0 outline-0 font-poppins font-light text-sm'
                        value={questions[index]?.options[2] || ""}
                        onChange={(e) => handleInput(e, index)}
                    />
                </div><div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                    <FaBook color='#777777' />
                    <input
                        type='text'
                        name='options4'
                        placeholder='Option 4'
                        className='w-full border-0 outline-0 font-poppins font-light text-sm'
                        value={questions[index]?.options[3] || ""}
                        onChange={(e) => handleInput(e, index)}
                    />
                </div>
            </div>
            <div className='flex items-center justify-start gap-4 p-2 border-b border-cs-gray mt-6'>
                <FaBook color='#777777' />
                <input
                    type='text'
                    name='explanation'
                    placeholder='Enter Explanation'
                    className='w-full border-0 outline-0 font-poppins font-light text-sm'
                    value={questions[index]?.explanation}
                    onChange={(e) => handleInput(e, index)}
                />
            </div>
            <div className='flex w-full items-center justify-center gap-3 mt-2'>
                <div className='flex-1/2 flex items-center justify-start gap-4 p-2 self-stretch border-b border-cs-gray mt-3'>
                    <FaChartBar color='#777777' />
                    <select
                        className='w-full outline-0 border-0 text-cs-gray text-sm'
                        value={questions[index]?.correctAnswer}
                        name="correctAnswer"
                        onChange={(e) => handleInput(e, index)}
                    >
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
