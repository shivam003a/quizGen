import mongoose from "mongoose"

export const isMongoIdValid = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}