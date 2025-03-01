import User from '../models/user.schema.js'
import blackListData from '../models/blacklisttoken.schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        if (!firstName || !email || !password) {
            return res.status(401).json({
                success: false,
                message: 'All fields are required',
                response: null
            })
        }

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(401).json({
                success: false,
                message: 'User already reigstered',
                response: null
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const responseData = await User.create({
            firstName,
            lastName: lastName || "",
            email,
            password: hashedPassword
        })

        const data = responseData.toObject()
        delete data?.password;

        res.status(201).json({
            success: true,
            message: "User signed up successfully",
            response: data
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e?.message || "Internal Server Error",
            response: null
        })
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: 'All fields are required',
                response: null
            })
        }

        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User is not registered",
                response: null
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, userExist?.password)
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials",
                response: null
            })
        }
        const token = await userExist.genAuthToken();

        res.cookie('quizGenAuthToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        const data = userExist.toObject()
        delete data?.password;

        res.status(200).json({
            success: true,
            message: "Sigin success",
            response: data,
            authToken: token
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e?.message || "Internal Server Error",
            response: null
        })
    }
}

export const signout = async (req, res) => {
    const token = req?.cookies?.quizGenAuthToken || req?.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'No token provided',
            response: null
        })
    }
    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded?.exp) {
            return res.status(400).json({
                success: false,
                message: "Invalid token",
                response: null
            })
        }

        const expiryAt = new Date(decoded?.exp * 1000);
        await blackListData.create({ token, expiryAt })

        res.clearCookie('quizGenAuthToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None'
        })

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
            response: null
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e?.message || "Internal Server Error",
            response: null
        })
    }
}