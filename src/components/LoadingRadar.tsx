import React from "react";
import Image from "next/image";


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
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
      <Image src={'/lo-fi-concept-animate.svg'} alt='loading' width={400} height={400}  />
      <h1 className="mt-2 text-xl">{loadingText}</h1>
    </div>
  );
};

export default LoadingRadar;
