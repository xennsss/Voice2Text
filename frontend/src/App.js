import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "@fontsource/poppins"; // Ya lo estabas usando, ¡genial!

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setText("");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "audio/wav": [".wav"], "video/mp4": [".mp4"] },
    multiple: false,
  });

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

  // --- Estilos para un look más limpio y coherente ---
  const colorPrimary = "#2e7d32"; // Verde oscuro principal
  const colorLight = "#a8f1b0"; // Verde claro para fondo
  const colorBg = "#f7fff7"; // Fondo de la tarjeta

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    background: `linear-gradient(135deg, ${colorLight}, #e0f7e9)`,
    padding: "20px",
  };

  const cardStyle = {
    background: colorBg,
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "650px",
    width: "90%",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Sombra más profesional
    textAlign: "center",
  };

  const dropzoneBaseStyle = {
      padding: "30px",
      borderRadius: "15px",
      // 💡 CAMBIO PRINCIPAL: Borde sólido más claro y fino
      border: `1px solid #e0e0e0`, // Borde gris muy claro, apenas visible
      background: "#f0fff4", // Fondo verde muy claro
      color: colorPrimary,
      cursor: "pointer",
      fontWeight: "500",
      fontSize: "18px",
      transition: "all 0.3s ease",
      marginBottom: "25px",
      // 💡 NUEVO: Una sombra sutil ayuda a definir el área
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  };

  const dropzoneActiveStyle = {
    borderColor: "#1b5e20",
    background: "#e8f5e9", // Un cambio de color al arrastrar
  };
  
  const dropzoneStyle = isDragActive ? { ...dropzoneBaseStyle, ...dropzoneActiveStyle } : dropzoneBaseStyle;


  const buttonStyle = {
    padding: "14px 35px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "17px",
    background: colorPrimary,
    color: "#fff",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
    opacity: loading ? 0.7 : 1, // Opacidad al cargar
  };

  const textStyle = {
    marginTop: "25px",
    whiteSpace: "pre-wrap",
    textAlign: "left",
    background: "#f8f8f8", // Fondo más sutil para el resultado
    padding: "20px",
    borderRadius: "15px",
    maxWidth: "100%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    fontSize: "16px",
    lineHeight: "1.6",
    borderLeft: `5px solid ${colorPrimary}`, // Detalle profesional
  };

  // Reemplazamos los onMouseOver/Out con un estilo dinámico de React.
  const [buttonHovered, setButtonHovered] = useState(false);
  const finalButtonStyle = {
    ...buttonStyle,
    background: buttonHovered ? "#1b5e20" : colorPrimary, // Cambio de color al hacer hover
    boxShadow: buttonHovered ? "0 8px 15px rgba(0,0,0,0.2)" : "0 6px 10px rgba(0,0,0,0.15)",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginBottom: "15px", color: colorPrimary, fontSize: "32px", fontWeight: "700" }}>
          <span role="img" aria-label="Microphone">🎤</span> Quick Transcribe
        </h1>
        <p style={{ marginBottom: "30px", color: "#555", fontSize: "16px" }}>
          Sube tu archivo para obtener la transcripción instantánea.
        </p>
        <hr style={{ border: `0.5px solid #eee`, marginBottom: "30px" }} />

        {/* Dropzone */}
        <div {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          {
            isDragActive
              ? "¡Suelta el archivo aquí!"
              : file
                ? `Archivo seleccionado: ${file.name}`
                : "Haz clic o arrastra un archivo (.mp4 / .wav)"
          }
        </div>

        {/* Botón de transcribir */}
        {file && (
          <button
            onClick={handleUpload}
            disabled={loading}
            style={finalButtonStyle}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            {loading ? (
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span className="spinner" style={{
                  border: '3px solid #f3f3f3',
                  borderTop: '3px solid #fff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  animation: 'spin 1s linear infinite',
                  marginRight: '8px',
                }}></span>
                Procesando...
              </span>
            ) : "Transcribir Audio"}
          </button>
        )}
        
        {/* Agregamos el CSS para la animación del spinner (puedes moverlo a un archivo CSS) */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>


        {/* Resultado */}
        {text && <div style={textStyle}>{text}</div>}
      </div>
    </div>
  );
}

export default App;