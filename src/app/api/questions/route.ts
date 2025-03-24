import { strict_output } from "@/lib/gpt";
import { getQuestionsSchema } from "@/schemas/getQuestionsSchema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAuthSession } from "@/lib/nextauth";

export async function POST(req: Request, res: Response) {
  try {
        const session = await getAuthSession();
        console.log("Session data:", session);
        if (!session?.user) {
          return NextResponse.json(
            {
              error: "You must be logged in",
            },
            { status: 401 }
          );
        }

    const body = await req.json();
    const { amount, topic, type } = getQuestionsSchema.parse(body);

    const questionData = {
      open_ended: {
        prompt: "You are a intelligence and great at knowledge tech recruiter that is able to generate mcq questions and answers for technical interview questions, the length of each answer should not be more than 40 words, store all the pairs of answers and questions in a JSON array. Don't talk with me!",
        template: `You are to generate a random hard open-ended questions about ${topic}`,
        fields: {
          question: "",
          answer: "",
        },
      },
      mcq: {
        prompt: "You are a intelligence and great at knowledge tech recruiter that is able to generate mcq questions and answers for technical interview questions, the length of each answer should not be more than 40 words, store all answers and questions and options in a JSON array. Only all answers and questions and options. Don't talk with me!",
        template: `You are to generate a random hard mcq question about ${topic}`,
        fields: {
          question: "",
          answer: "answer with max length of 70 words",
          option1: "option1 with max length of 40 words",
          option2: "option1 with max length of 40 words",
          option3: "option1 with max length of 40 words",
        },
      },
    };

    const { prompt, template, fields } = questionData[type];
    const questions = await strict_output(prompt, new Array(amount).fill(template), fields);

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      console.error("elle gpt error", error);
      return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
    }
  }
}
