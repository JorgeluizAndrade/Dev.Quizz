import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import DevQuizzLogo from "./Ui/DevQuizzLogo";
import SignInButton from "./SignInButton";
import UserAccount from "./UserAccount";
import ThemeToggle from "./ThemeToggle";


type Props = {};

const Navabar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-50 h-fit border-b border-zinc-300 py-2 ">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        <DevQuizzLogo />
        
        <div className="flex items-center">
          <ThemeToggle className="mr-4" />
          <div className="flex items-center">
            {session?.user ? (
              <h1>
                <UserAccount user={session.user} />
              </h1>
            ) : (
              <SignInButton text="Sign in" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navabar;
