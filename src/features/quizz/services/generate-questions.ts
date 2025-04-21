import { getQuestionsSchema } from "@/features/quizz/schemas";
import { strict_output } from "@/lib/gpt";

const questionData = {
    open_ended: {
      prompt: "You are an intelligent and highly knowledgeable tech recruiter who generates unique and challenging open-ended questions for technical interviews. Each answer should be clear and well-structured, and must not exceed 75 words. Ensure no duplicate or similar questions or answers are created. Do not include any explanations or additional text. Don't talk to me.",
      template: (topic: string) => `Generate a random hard open-ended questions about ${topic}`,
      fields: {
        question: "",
        answer: "",
      },
    },
    mcq: {
      prompt: "You are an intelligent and highly experienced tech recruiter with deep knowledge of software engineering, capable of generating advanced and realistic multiple-choice questions (MCQs) for technical interviews. Focus on conceptual depth, real-world scenarios, and problem-solving. Answers should be clear and concise, with varied lengths depending on the content (not exceeding 80 words). Store all questions, answer options, and the correct answer in a valid JSON array. Ensure all content is unique — no duplicates or rephrased versions. Only output the questions, options, and answers in valid JSON format. Do not include any explanations, headers, or extra text.",
      template: (topic: string) => `Generate a random hard multiple-choice questions about ${topic}.`,
      fields: {
        question: "",
        answer: "Concise answer, with flexible length depending on the topic (max 80 words).",
        option1: "Plausible option with natural length and clarity.",
        option2: "Plausible option with natural length and clarity.",
        option3: "Plausible option with natural length and clarity."
    
      },
    },
  };


  export async function generateQuestions(input: unknown) {
    const { amount, topic, type } = getQuestionsSchema.parse(input);
  
    const { prompt, template, fields } = questionData[type];
    const templates = Array(amount).fill(template(topic));
  
    const questions = await strict_output(prompt, templates, fields);
  
    return questions;
  }
  

