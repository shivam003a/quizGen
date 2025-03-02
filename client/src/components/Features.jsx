import React, { useState } from 'react'
import '../App.css'
import bg1 from '../assets/bgs1.jpg'
import bg2 from '../assets/bgs2.jpg'
import bg3 from '../assets/bgs3.jpg'
import bg4 from '../assets/bgs4.jpg'
import bg5 from '../assets/bgs5.jpg'

const features = [
    {
        title: "AI-Powered Quiz Generation",
        subtitle: "Generate unique quizzes in seconds",
        description: "Just enter a topic, select difficulty, and let AI create a custom quiz for you instantly!",
        image: bg1,
    },
    {
        title: "Custom Difficulty Levels",
        subtitle: "Tailored learning experience",
        description: "Choose from Easy, Medium, or Hard difficulty to match your knowledge level and learning goals.",
        image: bg2,
    },
    {
        title: "Multiple Choice Questions",
        subtitle: "Engaging and interactive MCQs",
        description: "Get well-structured, AI-generated MCQs that test your knowledge and improve your learning efficiency.",
        image: bg3,
    },
    {
        title: "Instant Quiz Attempt",
        subtitle: "Take quizzes on the go",
        description: "Sign up and start attempting quizzes instantly, with real-time feedback and performance tracking.",
        image: bg4,
    },
    {
        title: "Leaderboard & Score Tracking",
        subtitle: "Compete and improve",
        description: "Track your progress on the leaderboard, compare scores with friends, and stay motivated to learn more.",
        image: bg5,
    },
    {
        title: "Save & Review Past Quizzes",
        subtitle: "Learn from your mistakes",
        description: "Access your quiz history, review answers, and improve your knowledge by revisiting past questions.",
        image: bg1,
    },
    {
        title: "Dark & Light Mode",
        subtitle: "Comfortable for all users",
        description: "Switch between dark and light mode to enhance your experience while taking quizzes, day or night.",
        image: bg2,
    },
];


const Features = () => {
    const [activeTile, setActiveTile] = useState(0)

    return (
        <div className='w-full flex flex-col items-center justify-between'>
            <span className='text-4xl font-bold my-10'>Features</span>
            <div className='w-full flex items-center justify-center p-4'>
                <div className='flex-1/10 flex flex-col md:flex-3/10'>
                    {
                        features?.length > 0 && features?.map((feature, index) => (
                            <span key={index} className={`p-5 pl-10 rounded-l-4xl text-lg cursor-pointer ${index === activeTile ? 'bg-blue-100 text-cs-blue' : 'bg-white'}`}
                                onClick={(e) => setActiveTile(index)}
                            >{feature?.title}</span>
                        ))
                    }
                </div>
                <div className={`flex-7910 md:flex-7/10 self-stretch bg-blue-100 min-h-full flex rounded-r-xl overflow-hidden rounded-l-xl ml-[-8px]`}>
                    <div className='flex-1/2 flex flex-col gap-6 p-4'>
                        <span className='text-4xl text-white font-bold capitalize text-image'>{
                            features[activeTile]?.subtitle?.split(' ')?.map((ele, i) => (
                                <div key={i}>{ele}</div>
                            ))
                        }</span>
                        <span className='text-xl text-cs-blue'>{features[activeTile]?.description}</span>
                    </div>
                    <div className='flex-1/2 invisible md:visible'>
                        <img src={features[activeTile]?.image} className='w-full h-full overflow-hidden object-cover aspect-square' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
