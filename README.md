# 🎵 Music AI - Song Recommender
<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/c7ee93cd-f4a5-497f-9d8f-57e627e5e728" />

A mood-based music recommendation app powered by a **local Ollama LLM**. Tell the app how you're feeling and it suggests 8 songs that match your vibe - no API keys, no cloud, fully private.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| AI Model | Ollama (local LLM — `llama3` / `mistral`) |
| Styling | Vanilla CSS |
| HTTP | Native `fetch` (frontend), `axios` (backend) |

---

## 📁 Project Structure

```
music-ai/
├── backend/
│   ├── server.js            # Express server entry point
│   ├── cli.js               # CLI client to test without frontend
│   ├── .env                 # Environment config (port, model, Ollama URL)
│   ├── routes/
│   │   └── recommend.js     # POST /api/recommend route
│   └── services/
│       └── ollama.js        # Ollama API integration
│
└── frontend/
    ├── index.html
    └── src/
        ├── main.jsx          # React entry point
        ├── App.jsx           # Main UI component
        └── App.css           # Dark theme styles
```

---

## ⚙️ Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [Ollama](https://ollama.com/) installed and running locally
- A pulled Ollama model (e.g., `llama3` or `mistral`)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd music-ai
```

### 2. Start Ollama

Open a terminal and run:

```bash
ollama serve
```

If you haven't pulled a model yet:

```bash
ollama pull llama3
# or
ollama pull mistral
```

Check which models you have:

```bash
ollama list
```

### 3. Set up the Backend

```bash
cd backend
npm install
```

Edit `.env` if needed:

```env
PORT=5000
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3        # change to match your pulled model
```

Start the backend:

```bash
npm run dev
```

Backend runs at → `http://localhost:5000`

### 4. Set up the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## 🖥️ Usage

### Via Browser (Frontend)

1. Open `http://localhost:5173`
2. Type how you're feeling (e.g. *"sad and nostalgic"*, *"happy and pumped up"*)
3. Click **Find Songs →**
4. 8 song recommendations animate in with title + artist

### Via CLI (No Frontend Needed)

With the backend running, open a separate terminal:

```bash
cd backend
node cli.js
```

```
🎵 Music AI — Song Recommender
================================
How are you feeling right now? > sad and nostalgic

⏳ Finding songs for your mood...

🎧 Songs for feeling "sad and nostalgic":

  1. The Night We Met - Lord Huron
  2. Tears Dry on Their Own - Amy Winehouse
  ...
```

### Via API (curl / Postman)

```bash
curl -X POST http://localhost:5000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"feeling": "calm and focused"}'
```

**Response:**
```json
{
  "feeling": "calm and focused",
  "songs": [
    "lo-fi hip hop radio - Chillhop Music",
    "Experience - Ludovico Einaudi",
    ...
  ]
}
```

---

## 🔌 API Reference

### `POST /api/recommend`

Suggest songs based on a feeling.

**Request Body:**
```json
{
  "feeling": "string"
}
```

**Success Response `200`:**
```json
{
  "feeling": "happy and energetic",
  "songs": [
    "Song Title - Artist Name",
    ...
  ]
}
```

**Error Response `400`:**
```json
{ "error": "Please provide a feeling." }
```

**Error Response `500`:**
```json
{ "error": "Failed to get recommendations. Is Ollama running?" }
```

### `GET /`

Health check.

```json
{ "status": "ok", "message": "Music AI backend is running 🎵" }
```

---

## 🛠️ Configuration

All backend config lives in `backend/.env`:

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Express server port |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama local server URL |
| `OLLAMA_MODEL` | `llama3` | Model to use for recommendations |

---

## 🧪 Running Both Services

You need **3 terminals** running simultaneously:

| Terminal | Command | Location |
|---|---|---|
| 1 | `ollama serve` | anywhere |
| 2 | `npm run dev` | `backend/` |
| 3 | `npm run dev` | `frontend/` |

---

## 📝 Notes

- The quality of recommendations depends on the Ollama model you use. `llama3` gives the best results.
- This project uses **no paid APIs** — everything runs locally on your machine.
- MongoDB is not wired up yet — it can be added later to store recommendation history.

---

## 🗓️ Roadmap

- [ ] Save recommendation history to MongoDB
- [ ] Add Spotify links to recommended songs
- [ ] Support streaming responses from Ollama
- [ ] Add mood tags / quick-select emotions
- [ ] User accounts and personalized history
