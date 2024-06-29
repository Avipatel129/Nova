import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Landing() {
  return (
    <div id="landing-page-cotainer" className="center flex-col">
      <ThemeToggle />
      <h1 className="text-4xl font-semibold">Nova</h1>
      <p className="text-lg text-center">
        Brightening your day with smart conversations
      </p>
      <Link href={"/dashboard"}>
        <Button className="center gap-2">
          <p>Get started</p>
          <ArrowRight size={16} />
        </Button>
      </Link>
    </div>
  );
}
