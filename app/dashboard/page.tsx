"use client";
import React, { useEffect, useRef, useState } from "react";
import { model } from "@/ai";

export default function Dashboard() {
  const [response, setResponse] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const promptRef = useRef<HTMLInputElement | null>(null);

  const generateResponse = async () => {
    setLoading(true);
    try {
      if (promptRef.current) {
        const result = await model.generateContent(promptRef.current.value);
        const res = await result.response;
        const text = res.text();
        setResponse(text);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (prompt != null) generateResponse();
  }, [prompt]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  return (
    <div>
      {response}
      <input type="text" ref={promptRef} />
      <button onClick={generateResponse}>Generate</button>
    </div>
  );
}
