import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
    difficulty: {
        type: String,
        required: true
    },
    noOfQuestion: {
        type: String,
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
    topic: {
        type: String
    },
    createdBy: {
        type: String
    }
}, { timestamps: true })

const Quiz = mongoose.model("Quiz", quizSchema)
export default Quiz;