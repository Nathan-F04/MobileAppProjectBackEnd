// src/controllers/promptController.js
import dotenv from "dotenv";
dotenv.config(); // Load env vars first!

import OpenAI from "openai";

 const client = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.OPENAI_API_KEY,
});

export const getValue = async (req, res) => {
  try {
    const { model, year } = req.body;
    const prompt = `Model: ${model}, Year: ${year}`;

    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a car valuation assistant. Estimate price in euros. ONLY return the estimated price NEVER return any other text in your responses. Return price as an INT",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-4o",
    });

    res.json({
      result: parseInt(response.choices[0].message.content),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to estimate price" + err.message });
  }
};
