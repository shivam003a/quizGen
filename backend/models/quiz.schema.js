import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tags: [],
    timeLimit: {
        type: Number,
        required: true
    },
    questions: [{
        question: {
            type: String
        },
        options: Array,
        correctAnswer: {
            type: String
        },
        explanation: {
            type: String
        }
    }],
    difficulty: {
        type: String,
        required: true
    },
    noOfQuestion: {
        type: String,
        required: true
    },
    createdBy: {
        type: String
    }
}, { timestamps: true })

const Quiz = mongoose.model("Quiz", quizSchema)
export default Quiz;