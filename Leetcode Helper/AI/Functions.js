import  { Groq } from "groq-sdk";

const groq = new Groq({apiKey: "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"});
import { streamText } from 'ai';

export const askquestionaboutproblem = async (problem) => {

    const name = problem.name;
    const que = problem.question;

    const chatcompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a leetcode tutor and a student asks you a question about the problem.You only have to provide hints and intituion to solve this problem. " + name ,
            },
            {
                role:"user",
                content: "This is the question user asked you about the given problem" + que,
            }
        ],
        model : "gemma2-9b-it",
        
    });

    const ans =  chatcompletion.choices[0].message.content;

   
    
   
    return ans;

    




}
