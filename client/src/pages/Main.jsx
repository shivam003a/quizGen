import React from 'react'
import Dashboard from '../components/Dashboard'
import Quiz from '../components/Quiz'
import Create from '../components/Create'

const Main = ({ type }) => {

    return (
        <div className='w-screen h-screen overflow-x-hidden'>
            <div className='max-w-[1200px] mx-auto w-full h-full'>
                {type === 'dashboard' ? (<Dashboard />) : (type === 'list' ? (<Quiz />) : (<Create />))}
            </div>
        </div>
    )
}

export default Main
