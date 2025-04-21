"use client";

import SignInButton from "@/components/shared/SignInButton";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import AnimatedTextWord from "@/components/ui/AnimatedTextWord";
import React from "react";

type Props = {};

const IntroCard = (props: Props) => {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row items-start justify-center gap-8 w-full max-w-[1000px] p-4 mx-auto my-8">
      <div className="w-full sm:w-1/2 max-w-[450px] text-gray-700 dark:text-white">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">About Dev.Quizz</h2>
        <div className={`space-y-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <p className="">
            The Dev.Quizz is a dynamic and interactive platform designed for developers of all levels and skills. If
            {` you're`} passionate about programming and want to test your knowledge, this is your place! Dev.Quizz offers
            you a series of quizzes on all programming languages with AI, specifically Llama 3.3-70B-Instruct.
          </p>
          <p>
            With Dev.Quizz, you can challenge yourself to improve your skills for interviews. Hello, {` I'm `} Jorge Luiz from Brasil, and
            my mission is to help others improve their knowledge and skills. I really hope this platform can help you😁. God bless you, my friends.
          </p>
          <p className="font-semibold text-yellow-500">{`Let's`} get started and see how much you really know?</p>
        </div>
        </div>
      
    
      <Card className="max-w-[450px]">
        <CardHeader className="flex gap-3">
          🧠
          <div className="flex flex-col">
            <AnimatedTextWord text="Welcome To Dev.Quizz" />
            <p className="text-small text-default-500">dev.quizz</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="hyphens-auto">
            <AnimatedTextWord text=" If you're a developer looking to test your knowledge for the interview, you're in the right place. Let's get started!" />
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
