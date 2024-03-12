require('dotenv').config();
import OpenAI from "openai";

const openaiApiKey = process.env.OPENAI_API_KEY || '';
export const openai = new OpenAI.OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true,
});