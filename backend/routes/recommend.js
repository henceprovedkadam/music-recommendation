const express = require("express");
const router = express.Router();
const { getSongRecommendations } = require("../services/ollama");

// POST /api/recommend
// Body: { feeling: "sad and nostalgic" }
router.post("/", async (req, res) => {
  const { feeling } = req.body;

  if (!feeling || feeling.trim() === "") {
    return res.status(400).json({ error: "Please provide a feeling." });
  }

  try {
    const recommendations = await getSongRecommendations(feeling.trim());

    // Parse the numbered list into an array
    const songs = recommendations
      .split("\n")
      .filter((line) => /^\d+\./.test(line))
      .map((line) => line.replace(/^\d+\.\s*/, "").trim());

    res.json({ feeling, songs });
  } catch (err) {
    console.error("Ollama error:", err.message);
    res.status(500).json({
      error: "Failed to get recommendations. Is Ollama running?",
    });
  }
});

module.exports = router;
