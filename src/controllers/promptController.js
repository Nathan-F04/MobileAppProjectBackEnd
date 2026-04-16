import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.OPENAI_API_KEY
});

export const getValue = async (req, res) => {
  try {
    console.log("TOKEN:", process.env.OPENAI_API_KEY);
    const car = req.body;
 
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a car valuation assistant. Estimate price in euros. ONLY return the estimated price NEVER return any other text in your responses."
        },
        {
          role: "user",
          content: JSON.stringify(car)
        }
      ],
      model: "openai/gpt-4o",
    });
 
    res.json({
      result: response.choices[0].message.content
    });
 
  } catch (err) {
    res.status(500).json({ error: "Failed to estimate price" });
  }
};