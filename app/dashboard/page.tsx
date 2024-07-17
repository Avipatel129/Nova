"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpFromDot, Crown, Dumbbell, Magnet, Plane } from "lucide-react";
import { generateUniqueId } from "@/utils/utils";
import { PuffLoader } from "react-spinners";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { useUser } from "@clerk/nextjs";
import { model } from "@/ai";
import Image from "next/image";
import Nova from "@/assets/Nova.png";
import { getTheme } from "@/utils/localStorage";
import Avatar from "@/assets/avatar.jpg";

const defaultPrompt = [
  {
    text: "Experience Boston like local",
    icon: <Plane size={14} />,
  },
  {
    text: "Tell me a fact about Newton",
    icon: <Magnet size={14} />,
  },
  {
    text: "Morning routine for healthy body",
    icon: <Dumbbell size={14} />,
  },
  {
    text: "Tell me about Mughals",
    icon: <Crown size={14} />,
  },
];

type PromptCollectionType = {
  id: string;
  prompt: string;
  response: string;
};

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [promptCollection, setPromptCollection] = useState<
    PromptCollectionType[]
  >([]);

  const promptRef = useRef<HTMLTextAreaElement | null>(null);
  const promptContainerRef = useRef<HTMLDivElement | null>(null);

  // function to generate response from prompt
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
      console.log(text);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      if (promptRef.current) promptRef.current.value = "";
    }
  };

  //function to set prompt
  function handleGenerate() {
    if (promptRef.current && promptRef.current.value !== "") {
      setPrompt(promptRef.current.value);
    }
  }

  // whenever prompt changes this will trigger generateResponse()
  useEffect(() => {
    generateResponse();
  }, [prompt]);

  // handling page scroll
  useEffect(() => {
    scrollToEnd();
  }, [promptCollection, loading]);

  function scrollToEnd() {
    if (promptContainerRef.current) {
      promptContainerRef.current.scrollTop =
        promptContainerRef.current.scrollHeight;
    }
  }

  if (!isLoaded) return <p>Loading ...</p>;

  return (
    <div id="dashboard">
      <div className="mx-auto h-screen w-full max-w-5xl px-4">
        <div
          id="prompt-container"
          className="relative h-[80vh] overflow-y-auto scroll-smooth"
          ref={promptContainerRef}
        >
          {/* default prompt container */}
          {promptCollection.length === 0 && !loading ? (
            <div className="center absolute bottom-20 w-full flex-wrap gap-6">
              {defaultPrompt.map((prompt) => (
                <div
                  className="flex w-36 cursor-pointer flex-col gap-2 rounded-md border-[1px] border-zinc-300 bg-zinc-200 p-3 text-sm text-zinc-600 duration-300 hover:bg-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800"
                  onClick={() => setPrompt(prompt.text)}
                >
                  {prompt.icon}
                  <p>{prompt.text}</p>
                </div>
              ))}
            </div>
          ) : null}

          {/* All prompts */}
          <div>
            {promptCollection.map((data) => (
              <div className="my-4 mb-16">
                <div className="flex items-start justify-start gap-4">
                  {isSignedIn ? (
                    <img
                      src={user.imageUrl}
                      alt="user"
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <Image
                      src={Avatar}
                      alt="Avatar"
                      className="h-8 w-8 rounded-full dark:invert"
                    />
                  )}

                  <p className="mt-1 font-bold">{data.prompt}</p>
                </div>

                <div className="mt-4 flex items-start justify-start gap-4">
                  <Image src={Nova} alt={"Nova"} className="h-8 w-8" />
                  <p className="mt-1">{data.response}</p>
                </div>
              </div>
            ))}
          </div>

          {/* when generating response from model placeholder loader */}
          {loading && (
            <div className="center my-4 flex-col gap-2">
              <PuffLoader
                color={getTheme() === "light" ? "black" : "pink"}
                size={50}
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Nova is thinking
              </p>
            </div>
          )}
        </div>

        {/* prompt area*/}
        <div className="center h-[10vh]">
          <textarea
            ref={promptRef}
            className="h-14 w-full rounded-l-md px-5 pt-4 outline-none"
            placeholder="Ask me anything"
          />
          <Button
            onClick={handleGenerate}
            className="center h-14 rounded-l-none rounded-r-md"
          >
            <ArrowUpFromDot size={16} />
          </Button>
        </div>
        <p className="mt-4 text-center text-xs text-zinc-600">
          Response is generated using{" "}
          <a
            href="https://ai.google.dev/"
            target="_blank"
            className="text-rose-500 dark:text-rose-400"
          >
            Google&apos;s Generative AI
          </a>
          . The developers do not take responsibility of the generated response
        </p>
      </div>
    </div>
  );
}
