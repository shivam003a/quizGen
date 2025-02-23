import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userScore: {
        type: String,
        required: true
    },
    totalAttempt: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    userSelectedAns: [String]
}, { timestamps: true })

const Score = mongoose.model('Score', scoreSchema)
export default Score;