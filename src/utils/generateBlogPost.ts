import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateBlogPost = async (commitMessage: string, files: any[]) => {
  const fileSummaries = files
    .map(file => {
      return `- ${file.filename}: ${file.status} (${file.additions} additions, ${file.deletions} deletions)`;
    })
    .join("\n");

  const prompt = `
You are a technical blogger. Write a blog post based on the following commit details:

Commit Message:
${commitMessage}

Files Changed:
${fileSummaries}

Include an introduction, a detailed explanation of the changes, and a conclusion summarizing the impact of the changes.
  `;

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
