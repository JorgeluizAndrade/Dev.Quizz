import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import DevQuizzLogo from "@/components/ui/DevQuizzLogo";
import SignInButton from "./SignInButton";
import UserAccount from "@/components/UserAccount";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import MobileNav from "./MobileNav";


type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-white dark:bg-black border-b border-zinc-300 dark:border-zinc-700">
    <nav className="flex items-center justify-between h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center space-x-2">
        <DevQuizzLogo />
        <span className="text-base font-bold text-gray-900 dark:text-white">DevQuizz</span>
      </Link>

      <div className="hidden md:flex items-center space-x-4">
        <ThemeToggle />
        {session?.user ? <UserAccount user={session.user} /> : <SignInButton text="Sign in" />}
      </div>

      <div className="md:hidden">
        <MobileNav session={session} />
      </div>
    </nav>
  </header>
  );
};

export default Navbar;
