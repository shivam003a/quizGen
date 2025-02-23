import { isMongoIdValid } from "../helpers/validMongoId.js";
import Score from "../models/score.schema.js";

export const getScoreData = async (req, res) => {
    const { userId } = req.body

    if (!isMongoIdValid(userId)) {
        return res.status(400).json({
            success: false,
            message: 'userId must be a valid id',
            reposne: null
        })
    }

    try {
        const scoresData = await Score.find({ userId }).populate('quizId')

        res.status(200).json({
            success: false,
            message: 'Fetch successfully',
            response: scoresData
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e?.message || 'Internal server error',
            response: null
        })
    }
}

export const getOneScoreData = async (req, res) => {
    const { userId, quizId } = req.body

    if (!isMongoIdValid(userId)) {
        return res.status(400).json({
            success: false,
            message: 'userId must be a valid id',
            reposne: null
        })
    }

    if (userId !== req.user.id) {
        return res.status(401).json({
            success: false,
            message: "Cannot attempt others quiz"
        })
    }

    try {
        const scoresData = await Score.find({ userId, quizId }).populate('quizId')

        res.status(200).json({
            success: false,
            message: 'Fetch successfully',
            response: scoresData
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e?.message || 'Internal server error',
            response: null
        })
    }
}