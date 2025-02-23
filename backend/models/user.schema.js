import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.methods.genAuthToken = async function () {
    const payload = {
        id: this?._id,
        email: this?.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token
}

const User = mongoose.model("User", userSchema)
export default User;