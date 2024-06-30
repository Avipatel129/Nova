"use client";
import React, { use, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Dashboard() {
  const GOOGLE_API_KEY: any = process.env.NEXT_PUBLIC_GOOLGE_API_KEY;
  useEffect(() => {
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    async function run() {
      const prompt = "Who is the precident of india?";

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
    }

    run();
  }, []);
  return <div>Hello from Dashboard </div>;
}
