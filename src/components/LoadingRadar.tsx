import {
  Database,
  DollarSign,
  GithubIcon,
  PlugZap2,
  Puzzle,
  Wrench,
} from "lucide-react";
import { IconContainer } from "./Ui/IconContainer";
import { Radar } from "./Ui/Radar";
import React from "react";


type Props = { finished: boolean };

const loadingTexts = [
  "Generating questions...",
  "The first rule of Dev.quizz is you don’t talk about Dev.quizz...",
  "Debugging the path to innovation...",
  "Programming the canvas of possibilities...",
  "Cracking the code to endless creativity...",
];

const LoadingRadar = ({ finished }: Props) => {
  const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);


  React.useEffect(()=> {
      const interval = setInterval(()=> {
        let randomIdx = Math.floor(Math.random() * loadingTexts.length);
         setLoadingText(loadingTexts[randomIdx]);
      }, 2000)

      return ()=> clearInterval(interval)
  })

 

  return (
    <div className="relative flex h-96 w-full flex-col items-center justify-center space-y-4 overflow-hidden px-4">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex w-full  items-center justify-center space-x-10 md:justify-between md:space-x-0 ">
          <IconContainer text="Web Development" delay={0.2} />
          <IconContainer
            delay={0.4}
            text="Mobile apps"
            icon={<DollarSign className=" h-8 w-8 text-slate-600" />}
          />
          <IconContainer
            text="Designing"
            delay={0.3}
            icon={<Puzzle className=" h-8 w-8 text-slate-600" />}
          />
        </div>
      </div>
      <div className="mx-auto w-full max-w-md">
        <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0 ">
          <IconContainer
            text="Maintenence"
            delay={0.5}
            icon={<Wrench className=" h-8 w-8 text-slate-600" />}
          />
          <IconContainer
            text="Server management"
            icon={<Database className=" h-8 w-8 text-slate-600" />}
            delay={0.8}
          />
        </div>
      </div>
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0 ">
          <IconContainer
            delay={0.6}
            text="GitHub Integration"
            icon={<GithubIcon className=" h-8 w-8 text-slate-600" />}
          />
          <IconContainer
            delay={0.7}
            text="CMS Integration"
            icon={<PlugZap2 className=" h-8 w-8 text-slate-600" />}
          />
        </div>
      </div>

      <Radar className="absolute -bottom-12" />
      <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <h1 className="mt-2 text-xl">{loadingText}</h1>
    </div>
  );
};

export default LoadingRadar;
