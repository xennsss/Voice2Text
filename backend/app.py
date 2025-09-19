import os
import uuid
import whisper
import ffmpeg
from flask import Flask, request, jsonify

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load Whisper model
model = whisper.load_model("base")

@app.route("/", methods=["GET"])
def home():
    return "<h2>Flask server is running</h2><p>Use POST /transcribe to upload an .mp4 or .wav file</p>"

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Check file extension
    filename = file.filename
    ext = os.path.splitext(filename)[1].lower()

    if ext not in [".mp4", ".wav"]:
        return jsonify({"error": "Only .mp4 or .wav files are allowed"}), 400

    # Save uploaded file
    input_path = os.path.join(UPLOAD_FOLDER, str(uuid.uuid4()) + ext)
    file.save(input_path)

    # Convert to WAV if needed
    if ext == ".mp4":
        wav_path = input_path.replace(".mp4", ".wav")
        try:
            (
                ffmpeg
                .input(input_path)
                .output(wav_path, format='wav')
                .run(overwrite_output=True, quiet=True)
            )
        except Exception as e:
            return jsonify({"error": f"Error converting to wav: {str(e)}"}), 500
        os.remove(input_path)
    else:
        wav_path = input_path

    # Transcribe using Whisper
    try:
        result = model.transcribe(wav_path, language="es")
    except Exception as e:
        return jsonify({"error": f"Error transcribing audio: {str(e)}"}), 500

    os.remove(wav_path)

    return jsonify({"text": result["text"]})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
