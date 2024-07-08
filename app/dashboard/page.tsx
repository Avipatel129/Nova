"use client";
import React, { useEffect, useRef, useState } from "react";
import { model } from "@/ai";
import { Button } from "@/components/ui/button";
import { ArrowUpFromDot } from "lucide-react";
import { generateUniqueId } from "@/utils/utils";
import { PuffLoader } from "react-spinners";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

type PromptCollectionType = {
  id: string;
  prompt: string;
  response: string;
};

export default function Dashboard() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [promptCollection, setPromptCollection] = useState<
    PromptCollectionType[]
  >([]);

  const promptRef = useRef<HTMLInputElement | null>(null);

  const generateResponse = async () => {
    if (prompt === "") return;

    setLoading(true);
    try {
      const result = await model.generateContent(prompt);
      const res = result.response;
      const text = res.text();
      setPromptCollection((prev) => [
        ...prev,
        { id: generateUniqueId(20), prompt: prompt, response: text },
      ]);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      if (promptRef.current) promptRef.current.value = "";
    }
  };

  function handleGenerate() {
    if (promptRef.current && promptRef.current.value !== "") {
      setPrompt(promptRef.current.value);
    }
  }

  useEffect(() => {
    generateResponse();
  }, [prompt]);

  return (
    <div id="dashboard" className="h-screen px-4">
      <div className="mx-auto h-full w-full max-w-5xl">
        <div className="h-[90vh] overflow-y-scroll">
          <div>
            {promptCollection.map((data) => (
              <div>
                <p className="font-bold">User: {data.prompt}</p>
                <Markdown>{data.response}</Markdown>
              </div>
            ))}
          </div>

          {loading && <PuffLoader />}
        </div>

        <div className="center h-[10vh]">
          <input
            type="text"
            ref={promptRef}
            className="w-full rounded-md rounded-l-full p-2 px-3 outline-none"
            placeholder="Ask me anything"
          />
          <Button onClick={handleGenerate} className="center rounded-r-full">
            <ArrowUpFromDot size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
