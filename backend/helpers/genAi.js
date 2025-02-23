import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config()

const genai = new OpenAI({
    apiKey: process.env.TA_API_KEY,
    baseURL: process.env.TA_BASE_URL,
});

export default genai;