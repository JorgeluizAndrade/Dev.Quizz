"use client";

import SignInButton from "@/components/SignInButton";
import iconDevquizz from "../../public/icons8-help-50.png";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import AnimatedTextWord from "./Ui/AnimatedTextWord";

type Props = {};

const IntroCard = (props: Props) => {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="max-w-[450px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="DevQuizz Icon"
            height={40}
            radius="sm"
            src={iconDevquizz.src}
            width={40}
          />
          <div className="flex flex-col">
            <AnimatedTextWord text="Welcome To Dev.Quizz" />
            <p className="text-small text-default-500">dev.quizz</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>
            <AnimatedTextWord text=" If you`re a developer looking to test your knowledge, you`re in the right place. Let`s get started!" />
          </p>
        </CardBody>
        <Divider />
        <CardFooter>
          <SignInButton text="Continue with google." />
        </CardFooter>
      </Card>
    </div>
  );
};

export default IntroCard;
