"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import UserAccount from "./UserAccount"
import SignInButton from "./SignInButton"

type MobileNavProps = {
  session: any
}

const MobileNav = ({ session }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 dark:text-gray-300"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-black border-b border-zinc-300 dark:border-zinc-700 p-4 flex flex-col space-y-4">
          <ThemeToggle />
          {session?.user ? <UserAccount user={session.user} /> : <SignInButton text="Sign in" />}
        </div>
      )}
    </>
  )
}

export default MobileNav

