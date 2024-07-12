"use client";

import React from "react";
import Nova from "@/assets/Nova.png";
import Image from "next/image";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
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
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <nav>
      <div className="center mx-auto w-full max-w-5xl gap-1 py-4">
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

        {isSignedIn ? (
          <SignedIn>
            <UserButton />
          </SignedIn>
        ) : (
          <Link
            href={"/dashboard"}
            className="rounded-sm px-2 py-1 duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
