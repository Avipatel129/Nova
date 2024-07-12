import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY: any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
