import { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const fetchOpenAISummary = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
    });

    return response.choices[0]?.message?.content || "No response received.";
  } catch (error) {
    console.error("Error fetching OpenAI data:", error);
    throw new Error("Failed to fetch summary");
  }
};

export const useGenerateBlogPost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generatePost = async (commitMessage: string): Promise<string> => {
    setIsLoading(true);
    try {
      const prompt = `Generate a blog post based on the following commit message:\n\n"${commitMessage}"`;
      const result = await fetchOpenAISummary(prompt);
      return result;
    } catch (error) {
      console.error("Error generating blog post:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { generatePost, isLoading };
};
