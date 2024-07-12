import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Nova from "@/assets/Nova.png";
import Navbar from "./Navbar";

export default function Landing() {
  return (
    <div
      id="landing-page-cotainer"
      className="mx-auto w-full max-w-5xl p-4 pt-0"
    >
      <Navbar />
      <div className="mt-20">
        <div className="center gap-4">
          <Image src={Nova} alt="Nova" className="h-12 w-12" />
          <h1 className="text-4xl font-semibold">Nova</h1>
        </div>

        <p className="mt-6 text-center text-lg text-zinc-600 dark:text-zinc-300">
          Brightening your day with smart conversations
        </p>
        <div className="center my-6">
          <Link
            href={"https://ai.google.dev/"}
            target="_blank"
            className="rounded-full bg-rose-100 px-2 py-1 text-xs text-rose-700 dark:bg-zinc-800 dark:text-rose-200"
          >
            Powered by Google&apos;s Generative AI
          </Link>
        </div>
      </div>
      <div className="my-10 w-full">
        <Link
          href={"/dashboard"}
          className="center mx-auto w-44 gap-2 rounded-full bg-rose-500 p-2 text-zinc-100 duration-300 hover:bg-rose-400"
        >
          <p>Get started now</p>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* <div className="h-96 w-full bg-zinc-200" /> */}

      <h1 className="mb-2 mt-10 text-2xl font-bold">About Nova</h1>
      <p className="dark:text-zinc-400">
        Nova is an AI powered chatbot designed to engage users in meaningful
        conversations using{" "}
        <Link
          href={"https://ai.google.dev/"}
          target="_blank"
          className="text-rose-600 hover:underline dark:text-rose-400"
        >
          Google&apos;s Generative AI API
        </Link>
        . From answering queries to providing personalized recommendations, Nova
        leverages advanced natural language processing to deliver insightful and
        efficient interactions, making it a versatile digital assistant.
      </p>
    </div>
  );
}
