import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setText("");

    try {
      const res = await fetch("http://127.0.0.1:5000/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.text) {
        setText(data.text);
      } else {
        setText("❌ Error: " + (data.error || "desconocido"));
      }
    } catch (err) {
      setText("❌ Error al conectar con el servidor.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transcriptor de Audio/Video 🎙️</h2>
      <input
        type="file"
        accept=".mp4,.wav"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Procesando..." : "Transcribir"}
      </button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        {text}
      </div>
    </div>
  );
}

export default App;
