import React from "react";
import Nova from "@/assets/Nova.png";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const navlink = [
  {
    title: "About",
    href: "#about",
  },
  {
    title: "API Reference",
    href: "#",
  },
  {
    title: "Code",
    href: "#",
  },
];
export default function Navbar() {
  return (
    <nav>
      <div className="center p-4 w-full max-w-5xl mx-auto gap-1">
        <Image src={Nova} alt={"Nova"} className="w-8 h-8" />

        <div className="flex-1 center gap-10">
          {navlink.map((link: any) => (
            <Link
              href={link.href}
              key={link.href}
              className="hover:text-rose-500 duration-300"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <ThemeToggle />
        <Authenticator />
      </div>
    </nav>
  );
}

function Authenticator() {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button
            variant="outline"
            className="hover:bg-zinc-200 duration-300 dark:hover:bg-zinc-800"
          >
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
