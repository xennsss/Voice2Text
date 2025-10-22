# 🎤 Quick Transcribe: Transcriptor de Audio/Video (Flask + Whisper)

Este proyecto es una API web simple construida con Flask que utiliza el modelo de *Machine Learning* **OpenAI Whisper** para transcribir archivos de audio (`.wav`) y video (`.mp4`) a texto.

La aplicación está diseñada para ser altamente portable, ya que utiliza librerías nativas de Python (`torchaudio`) para el procesamiento de audio, eliminando la necesidad de instalar el ejecutable externo `ffmpeg.exe` en el sistema.

## ✨ Características Principales

* **Portabilidad:** No requiere la instalación manual de FFmpeg en el sistema.

* **Compatibilidad:** Soporta archivos `.mp4` y `.wav`.

* **Tecnología:** Utiliza el modelo `base` de Whisper (ideal para la CPU).

* **Idioma:** Transcripción forzada al español (`language="es"`).

## 🛠️ Requisitos de Instalación

Para ejecutar este proyecto, necesitas **Python 3.8+** y las siguientes librerías.

### 1. Clona el repositorio

git clone https://docs.github.com/es/repositories/creating-and-managing-repositories/quickstart-for-repositories cd quick-transcribe

### 2. Instalar dependencias

Es **fundamental** que instales todas las dependencias especificadas en el archivo `requirements.txt`. Algunas de estas librerías, como `torch` y `torchaudio`, son grandes.

pip install -r requirements.txt


> **Nota sobre PyTorch:** Si tienes una GPU NVIDIA, considera instalar la versión de PyTorch con soporte CUDA (consulta el sitio oficial de PyTorch).

## 🚀 Uso de la Aplicación

El proyecto consta de dos partes: la API de Flask (backend) y el frontend (que asumo que es una aplicación React/HTML/etc. que llama a la API).

### 1. Iniciar el Backend (API)

Desde la carpeta raíz del proyecto (`quick-transcribe`), ejecuta el servidor Flask:

python app.py

El servidor se iniciará en `http://127.0.0.1:5000/`.

### 2. Uso de la API (Endpoint)

El *endpoint* principal es `/transcribe`. Debes enviar una solicitud `POST` con un archivo de audio o video.

| Método | Endpoint | Descripción | 
 | ----- | ----- | ----- | 
| `POST` | `/transcribe` | Sube un archivo (`.mp4` o `.wav`) usando un formulario `multipart/form-data` con el campo `file`. | 

#### Ejemplo de uso con cURL:

curl -X POST http://127.0.0.1:5000/transcribe

-H "Content-Type: multipart/form-data"

-F "file=@/ruta/a/tu/archivo.mp4"


## 💡 Cómo funciona la portabilidad (Importante)

El archivo `app.py` utiliza `whisper.load_audio()`. Esta función se encarga de:

1. Decodificar el archivo (`.mp4` o `.wav`) utilizando los códecs internos de PyTorch/Torchaudio.

2. Convertir el audio a **mono**.

3. Remuestrear el audio a **16000 Hz** (el requisito exacto de Whisper).

Esto elimina el paso manual de instalar y configurar el ejecutable `ffmpeg.exe` para el usuario final.