const express = require("express");
const cors = require("cors");
require("dotenv").config();

const recommendRoute = require("./routes/recommend");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/recommend", recommendRoute);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Music AI backend is running 🎵" });
});

app.listen(PORT, () => {
  console.log(`\n🎵 Music AI backend running at http://localhost:${PORT}`);
  console.log(`📡 Ollama model: ${process.env.OLLAMA_MODEL || "llama3"}`);
  console.log(`🔗 POST http://localhost:${PORT}/api/recommend\n`);
});
