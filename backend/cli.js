const readline = require("readline");
const axios = require("axios");

const API_URL = "http://localhost:5000/api/recommend";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n🎵 Music AI — Song Recommender");
console.log("================================");

rl.question("How are you feeling right now? > ", async (feeling) => {
  if (!feeling.trim()) {
    console.log("Please enter a feeling.");
    rl.close();
    return;
  }

  console.log("\n⏳ Finding songs for your mood...\n");

  try {
    const { data } = await axios.post(API_URL, { feeling });

    console.log(`🎧 Songs for feeling "${data.feeling}":\n`);
    data.songs.forEach((song, i) => {
      console.log(`  ${i + 1}. ${song}`);
    });
    console.log("");
  } catch (err) {
    if (err.code === "ECONNREFUSED") {
      console.error("❌ Backend not running. Start it with: npm run dev");
    } else {
      console.error("❌ Error:", err.response?.data?.error || err.message);
    }
  }

  rl.close();
});
