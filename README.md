## Overview

**Dev.Quizz** is a website developed for programmers from various areas who want to test their programming and technology knowledge for job interviews. It offers an interactive quiz platform, with dynamically generated questions and support for secure user authentication. The project uses modern technologies such as JWT, Google authentication and integration with Meta Llama-3.3-70b to create questions and answers.

**Dev.Quizz** is an educational and technological platform.

### Objective

To provide a fun and educational tool for developers to assess and improve their technical knowledge for job interviews. Dev.Quizz's mission is to help people improve their conceptual knowledge, so that in interviews they will not have difficulty with the questions asked to them.

### Target Audience

- Professionals looking to practice for technical interviews or certifications.
- Developers of all levels (beginners, intermediate and advanced); — mainly for interns and junior levels.
- Programming students;


## Technologies Used

 ### Frontend:
- **Next.js 13.4**
- **NextUI**
- **Framer Motion**
- **Tailwind CSS**
- **React Query**
- **React hook form**
 ### Backend:
- **Next.js API Routes and server.**
- **Prisma** **with MYSQL for database management**;
- **JWT (JSON Web Token) for secure authentication;**
- **Integration with Google authentication for easy login**.
- **OpenAI Library**
- **IA**: **Using external API OpenRouter with the use of prompts with Meta Llama-3.3-70b for generating questions and answers.**

## Main features

- **User Authentication**:
- Secure login via JWT;
- Google authentication option for easy access.
- **Question Generation**:
- Use of prompts with Meta Llama-3.3-70b to create dynamic and varied questions.
- **Interactive Quiz**:
- Interface to answer questions and test knowledge;
- Statistics of correct answers.
- **Data Management**:
- Scalable database with Prisma and MYSQL.

### Future features

- Stripe API for donations.
- Resume analysis with AI trained for this — But not for free, by paying for a plan or something like that. You can have it twice a month for free for low-income users.
- Job interview simulation with AI. — Also paid, with a plan or something like that. You can have it 5 times a month for free.
- Blog

## Diagram of sequination

 **Authentication**:
 - User logs in via /api/auth/[...nextauth] (e.g.: Google).
 - NextAuth creates a User, associates an Account and generates a Session.

   
 **Starting a Game**:
 - Request to /api/game creates a record in the Game model with userId, topic and gameType.

   
 **Generating Questions**:
  - Request to /api/questions uses external AI API to generate questions and saves them in the Question model, linked to the gameId.


 **Interaction with the Quiz**:
- User answers questions, and the answers are recorded in Question (userAnswer).
- Request to /api/checkAnswer to analyze and record the ‘isCorrect’ in Questions;
 
 **Finalization**:
- Request to /api/endGame the game is ended, updating timeEnded in Game.
