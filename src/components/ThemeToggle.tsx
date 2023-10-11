"use client";

import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Sun } from "lucide-react";
import { Moon } from 'lucide-react';



const ThemeToggle = ({
    className, ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
 
    const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div className={className} {...props}>
    <Dropdown>
      <DropdownTrigger > 
      <Button variant="shadow"
      disableRipple
      className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full 
      after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
       color="secondary" size="sm">
            <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Theme</span>
          </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Variants"
        color="primary"
        variant="shadow"
      >
        <DropdownItem key="light" onClick={() => setTheme('light')}>
         Light triad 
          </DropdownItem>
        <DropdownItem key="dark"  onClick={() => setTheme('dark')}>
          Dark triad 
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </div>
  );
};

export default ThemeToggle;
