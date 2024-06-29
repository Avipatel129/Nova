"use client";
import React, { use, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Dashboard() {
  useEffect(() => {
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(
      "AIzaSyAlw1WnfkTsaxBCJU53wbXHg3JhRq4M7M0"
    );

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
