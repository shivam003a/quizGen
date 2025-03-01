import mongoose from 'mongoose'
import { isMongoIdValid } from '../helpers/validMongoId.js'
import genai from '../helpers/genAi.js'
import Quiz from '../models/quiz.schema.js'
import Score from '../models/score.schema.js'

export const createQuiz = async (req, res) => {
    const { topic, difficulty, noOfQuestion } = req.body
    const { email } = req.user

    try {
        if (!topic || !difficulty || !noOfQuestion) {
            return res.status(401).json({
                success: false,
                message: 'All fields are required',
                response: null
            })
        }

        const randomSeed = Math.random().toString(36).substring(7);

        const prompt = `
        Generate a quiz on the topic of "${topic}" with ${noOfQuestion} questions of ${difficulty} difficulty.
        Each question should be unique and cover different aspects of the topic.
        Each question should have:
        1. A question statement.
        2. 4 multiple-choice options (labeled A, B, C, D).
        3. The correct answer (e.g., "A").
        4. A brief explanation of why the correct answer is right.

        Format the response as a JSON array where each object contains:
        - "question" (string)
        - "options" (array of 4 strings)
        - "correctAnswer" (string, e.g., "A")
        - "explanation" (string)

        Use double quotes for all property names and string values. Do not use single quotes.

        Example:
        [
            {
            "question": "What is the capital of France?",
            "options": ["Paris", "London", "Berlin", "Madrid"],
            "correctAnswer": "A",
            "explanation": "Paris is the capital of France, known for its cultural landmarks like the Eiffel Tower."
            }
        ]

        Random Seed: ${randomSeed}
        `;

        const response = await genai.chat.completions.create({
            model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        })

        console.log(response?.choices[0]?.message?.content)
        const quizData = JSON?.parse(response?.choices[0]?.message?.content)

        if (!quizData) {
            return res.status(401).json({
                success: false,
                message: 'Some Issue Occured',
                response: null
            })
        }

        const responseQuizData = await Quiz.create({
            difficulty,
            topic,
            noOfQuestion,
            questions: quizData,
            createdBy: email
        })

        res.status(201).json({
            success: true,
            message: "Quiz generated",
            data: responseQuizData
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e || "Internal Server Error",
            response: null
        })
    }
}

export const getQuiz = async (req, res) => {
    const query = {};
    let { page, limit, topic, createdBy, difficulty } = req.query;

    // query/ filtering
    page = parseInt(page) || 1;
    limit = Math.min(limit || 20, 20);

    if (topic) query["topic"] = topic;
    if (createdBy) query["createdBy"] = createdBy;
    if (difficulty) query["difficulty"] = difficulty;


    try {
        const allQuizData = await Quiz.find(query)
            .skip((page - 1) * limit)
            .limit(limit)

        const totalEntry = await Quiz.countDocuments(query);
        const totalPages = Math.ceil(totalEntry / limit)

        res.status(200).json({
            success: true,
            response: allQuizData,
            message: "Fetched successfully",
            pagination: {
                totalEntries: totalEntry,
                totalPages,
                currentPage: page,
                limit,
            }
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e?.message || "Internal Server Error",
            response: null
        })
    }
}

export const getSingQuiz = async (req, res) => {
    const { quizId } = req.params
    if (!quizId) {
        return res.status(400).json({
            success: false,
            message: 'quizId is required',
            response: null
        })
    }

    try {
        const quizData = await Quiz.findById(quizId);

        res.status(200).json({
            success: true,
            message: 'Fetched successfully',
            response: quizData
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e?.message || 'Internal server error',
            response: null
        })
    }
}

export const submitQuizForFirstTime = async (req, res) => {
    const { userScore, quizId, userId, userSelectedAns } = req.body
    const { id } = req.user

    if (!isMongoIdValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "userId must be valid id",
            response: null
        })
    }

    if (!isMongoIdValid(quizId)) {
        return res.status(400).json({
            success: false,
            message: "quizId must be valid id",
            response: null
        })
    }

    if (!Array.isArray(userSelectedAns)) {
        return res.status(400).json({
            success: false,
            message: "userSelectedAns must be a array",
            response: null
        })
    }

    if (userId !== id) {
        return res.status(401).json({
            success: false,
            message: "Cannot attempt others quiz",
            response: null
        })
    }

    try {
        const scoreData = await Score.create({
            quizId,
            userId,
            userScore,
            userSelectedAns,
            totalAttempt: 1
        })

        res.status(200).json({
            success: true,
            message: 'Submitted successfully',
            response: scoreData
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e?.message || "Internal server error",
            response: null
        })
    }
}

export const submitQuizForMoreTime = async (req, res) => {
    const { userScore, quizId, userId, userSelectedAns } = req.body
    const { id } = req.user

    if (!isMongoIdValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "userId must be valid id",
            response: null
        })
    }

    if (!isMongoIdValid(quizId)) {
        return res.status(400).json({
            success: false,
            message: "quizId must be valid id",
            response: null
        })
    }

    if (!Array.isArray(userSelectedAns)) {
        return res.status(400).json({
            success: false,
            message: "userSelectedAns must be a array",
            response: null
        })
    }

    if (userId !== id) {
        return res.status(401).json({
            success: false,
            message: "Cannot attempt others quiz",
            response: null
        })
    }

    try {
        const updatedScoreData = await Score.findOneAndUpdate({ quizId, userId }, {
            $set: { userScore, userSelectedAns },
            $inc: { totalAttempt: 1 }
        }, { new: true })

        res.status(200).json({
            success: true,
            message: 'Submitted successfully',
            response: updatedScoreData
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e?.message || "Internal server error",
            response: null
        })
    }
}