import { strict_output } from "@/lib/gpt";
import { getQuestionsSchema } from "@/schemas/getQuestionsSchema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getAuthSession } from "@/lib/nextauth";


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getAuthSession();

    if (!session) {
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
        prompt: "You are an intelligent and highly knowledgeable tech recruiter who generates unique and challenging open-ended questions for technical interviews. Each answer should be clear and well-structured, and must not exceed 75 words. Ensure no duplicate or similar questions or answers are created. Do not include any explanations or additional text. Don't talk to me.",
        template: `You are to generate a random hard open-ended questions about ${topic}`,
        fields: {
          question: "",
          answer: "",
        },
      },
      mcq: {
        prompt: "You are an intelligent and highly knowledgeable tech recruiter who generates challenging and diverse multiple-choice questions (MCQs) for technical interviews. Answers should be concise and clear, with varied lengths depending on the content (not exceeding 80 words). Store all questions, options, and correct answers in a JSON array. Ensure no duplicate or similar questions or answers are created. Only output the questions, options, and answers in valid JSON. Do not include any explanations or extra text.",
        template: `You are to generate a random hard mcq question about ${topic}`,
        fields: {
          question: "",
          answer: "Concise answer, with flexible length depending on the topic (max 80 words).",
          option1: "Plausible option with natural length and clarity.",
          option2: "Plausible option with natural length and clarity.",
          option3: "Plausible option with natural length and clarity."
      
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
