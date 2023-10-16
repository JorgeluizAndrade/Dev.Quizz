import { strict_output } from "@/lib/gpt";
import { getQuestionsSchema } from "@/schemas/getQuestionsSchema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { amount, topic, type } = getQuestionsSchema.parse(body);

    const questionData = {
      open_ended: {
        prompt: "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 10 words, store all the pairs of answers and questions in a JSON array",
        template: `You are to generate a random hard open-ended questions about ${topic}`,
        fields: {
          question: "question",
          answer: "answer with max length of 10 words",
        },
      },
      mcq: {
        prompt: "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 10 words, store all answers and questions and options in a JSON array",
        template: `You are to generate a random hard mcq question about ${topic}`,
        fields: {
          question: "question",
          answer: "answer with max length of 10 words",
          option1: "option1 with max length of 10 words",
          option2: "option2 with max length of 10 words",
          option3: "option3 with max length of 10 words",
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
