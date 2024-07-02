import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import Nova from "@/assets/Nova.png";
import Navbar from "./Navbar";

export default function Landing() {
  return (
    <div id="landing-page-cotainer" className="p-4 max-w-5xl w-full mx-auto">
      <Navbar />
      <div className="mt-20">
        <div className="center gap-4">
          <Image src={Nova} alt="Nova" className="w-12 h-12" />
          <h1 className="text-4xl font-semibold">Nova</h1>
        </div>

        <p className="text-lg text-center text-zinc-600 mt-6 dark:text-zinc-300">
          Brightening your day with smart conversations
        </p>
        <div className="center my-2">
          <Link
            href={"https://ai.google.dev/"}
            target="_blank"
            className="bg-rose-100 text-xs rounded-full px-2 text-rose-700 py-1 dark:text-rose-200 dark:bg-zinc-800"
          >
            Powered by Google&apos;s Generative AI
          </Link>
        </div>
      </div>
      <div className="my-10 w-full">
        <Link
          href={"/dashboard"}
          className="center gap-2 bg-rose-500 text-zinc-100 rounded-full p-2 w-44 mx-auto hover:bg-rose-400 duration-300"
        >
          <p>Get started now</p>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="w-full h-96 bg-zinc-200" />

      <h1 className="font-bold text-2xl mt-10 mb-2">About Nova</h1>
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
