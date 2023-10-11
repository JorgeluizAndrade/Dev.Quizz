"use client";

import React from "react";
import {
  Popover as PopoverNextUi,
  PopoverTrigger,
  Button,
  Divider,
  PopoverContent,
} from "@nextui-org/react";
import { ShieldQuestion } from "lucide-react";

type Props = {};

const Popover = (props: Props) => {
  return (
    <div className="flex flex-wrap md:inline-grid md:grid-cols-3 gap-4">
  <PopoverNextUi placement="right" color="primary">
    <PopoverTrigger>
      <Button color="primary" radius="full" variant="flat" className="capitalize">
        <ShieldQuestion />
      </Button>
    </PopoverTrigger>
    <PopoverContent>
      <div className="px-2 py-2">
        <div className="text-small font-bold">Welcome to Dev.Quizz!</div>
        <Divider />
        <div className="text-tiny">
          This website was created for developers! Want <br/> to test or improve your knowledge.
        </div>
        <Divider className="my-2" />
        <div className="text-small font-bold">Technologies I used to build this website:</div>
        <ul className="list-disc ml-4">
          <li>TypeScript</li>
          <li>Next.js</li>
          <li>NextUI</li>
          <li>Framer Motion</li>
          <li>Api OpenAI</li>
          <li>Tailwind CSS</li>
          <li>Prisma</li>
          <li>PlanetScale</li>
          <li>NextAuth</li>
        </ul>
      </div>
    </PopoverContent>
  </PopoverNextUi>
</div>
  );
};

export default Popover;
