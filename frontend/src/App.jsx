import { useState } from "react";
import "./App.css";

export default function App() {
  const [feeling, setFeeling] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feeling.trim()) return;

    setLoading(true);
    setError("");
    setSongs([]);
    setSubmitted(feeling.trim());

    try {
      const res = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feeling }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSongs(data.songs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <div className="logo">🎵</div>
        <h1>Music AI</h1>
        <p className="subtitle">Tell me how you feel — I'll find the soundtrack.</p>
      </header>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          className="feeling-input"
          placeholder="e.g. sad and nostalgic, happy and energetic..."
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !feeling.trim()}>
          {loading ? <span className="spinner" /> : "Find Songs →"}
        </button>
      </form>

      {error && <p className="error">⚠️ {error}</p>}

      {songs.length > 0 && (
        <section className="results">
          <p className="results-label">Songs for <em>"{submitted}"</em></p>
          <ul className="song-list">
            {songs.map((song, i) => {
              const [title, artist] = song.split(" - ");
              return (
                <li key={i} className="song-card" style={{ animationDelay: `${i * 60}ms` }}>
                  <span className="track-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="track-info">
                    <span className="track-title">{title}</span>
                    {artist && <span className="track-artist">{artist}</span>}
                  </div>
                  <span className="music-icon">♪</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
