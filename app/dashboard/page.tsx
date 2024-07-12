"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpFromDot } from "lucide-react";
import { generateUniqueId } from "@/utils/utils";
import { PuffLoader } from "react-spinners";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { model } from "@/ai";
import Image from "next/image";
import Nova from "@/assets/Nova.png";
import Link from "next/link";
import { getTheme } from "@/utils/localStorage";

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

  const promptRef = useRef<HTMLInputElement | null>(null);
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

  useEffect(() => {
    scrollToEnd();
  }, [promptCollection, loading]);

  function scrollToEnd() {
    if (promptContainerRef.current) {
      promptContainerRef.current.scrollTop =
        promptContainerRef.current.scrollHeight;
    }
  }

  if (!isLoaded || !isSignedIn) return <p>Loading ...</p>;

  return (
    <div id="dashboard">
      <div className="mx-auto h-screen w-full max-w-5xl px-4">
        <div className="flex h-[10vh] justify-between py-[18px]">
          <Link href={"/"}>
            <Image src={Nova} alt={"Nova"} className="h-8 w-8" />
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <div
          className="h-[80vh] overflow-y-auto scroll-smooth"
          ref={promptContainerRef}
        >
          <div>
            {promptCollection.map((data) => (
              <div className="my-16">
                <div className="flex items-start justify-start gap-4">
                  <img
                    src={user.imageUrl}
                    alt="user"
                    className="h-8 w-8 rounded-full"
                  />
                  <p className="mt-1 font-bold">{data.prompt}</p>
                </div>

                <div className="mt-4 flex items-start justify-start gap-4">
                  <Image src={Nova} alt={"Nova"} className="h-8 w-8" />
                  <p className="mt-1">{data.response}</p>
                </div>
              </div>
            ))}
          </div>

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
