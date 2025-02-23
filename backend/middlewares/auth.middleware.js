import jwt from 'jsonwebtoken'
import blackListData from '../models/blacklisttoken.schema.js'

export const isAuthenticated = async (req, res, next) => {
    const token = req?.cookies?.quizGenAuthToken || req?.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: true,
            message: "Unauthorized",
            response: null
        })
    }

    const isBlackListed = await blackListData.findOne({ token });
    if (isBlackListed) {
        return res.status(403).json({
            success: true,
            message: 'Unauthorized. x Please login again',
            response: null
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(403).json({
                success: true,
                message: 'Invalid token, access denied',
                response: null
            })
        }
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(403).json({
            success: true,
            message: 'Invalid token, access denied',
            response: null
        })
    }
}