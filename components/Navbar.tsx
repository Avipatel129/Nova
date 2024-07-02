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
      <div className="center mx-auto w-full max-w-5xl gap-1 p-4">
        <Image src={Nova} alt={"Nova"} className="h-8 w-8" />

        <div className="center flex-1 gap-10">
          {navlink.map((link: any) => (
            <Link
              href={link.href}
              key={link.href}
              className="duration-300 hover:text-rose-500"
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
            className="duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
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
