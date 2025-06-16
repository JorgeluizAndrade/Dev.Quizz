import {z} from 'zod'


enum NivelType  {
  Easy = "easy",
  Intermediary = "intermediary",
  Hard = "hard"
}


export const quizCreationSchema = z.object({
    topic: z.string().min(4, {message:"Topic must be at least 4 characters long"}).max(15),
    type: z.enum(['mcq', 'open_ended']),
    amount: z.number().min(1).max(3),
  nivelType: z.enum(["easy", "intermediary", "hard"])
})

export const checkAnswerSchema = z.object({
    questionId: z.string(),
    userAnswer: z.string(),

});


export const getQuestionsSchema = z.object({
  topic: z.string(),
  amount: z.number().int().positive().min(1).max(10),
  type: z.enum(["mcq", "open_ended"]),
  nivelType: z.enum(["easy", "intermediary", "hard"])

});

export const checkAnswerSchemas = z.object({
  userInput: z.string(),
  questionId: z.string(),
});

export const endGameSchema = z.object({
  gameId: z.string(),
});