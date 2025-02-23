import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiryAt: {
        type: Date,
        required: true,
        index: {
            expires: 0
        }
    }
})

const blackListData = mongoose.model("blackListData", blacklistSchema)
export default blackListData;