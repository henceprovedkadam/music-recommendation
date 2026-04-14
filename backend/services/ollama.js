const axios = require("axios");
require("dotenv").config();

const OLLAMA_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const MODEL = process.env.OLLAMA_MODEL || "llama3";

async function getSongRecommendations(feeling) {
  const prompt = `
You are a music recommendation assistant.
The user is feeling: "${feeling}"

Suggest exactly 8 songs that match this mood/feeling.
Format your response as a clean numbered list like this:
1. Song Title - Artist Name
2. Song Title - Artist Name
...

Only return the list. No explanations, no extra text.
  `.trim();

  const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
    model: MODEL,
    prompt,
    stream: false,
  });

  return response.data.response.trim();
}

module.exports = { getSongRecommendations };
