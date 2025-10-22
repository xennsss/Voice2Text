# 🎤 Quick Transcribe: Transcriptor de Audio/Video (Flask + Whisper)

Este proyecto es una API web simple construida con Flask que utiliza el modelo de *Machine Learning* **OpenAI Whisper** para transcribir archivos de audio (`.wav`) y video (`.mp4`) a texto.

La aplicación está diseñada para ser altamente portable, ya que utiliza librerías nativas de Python (`torchaudio`) para el procesamiento de audio, eliminando la necesidad de instalar el ejecutable externo `ffmpeg.exe` en el sistema.

## ✨ Características Principales

* **Portabilidad:** No requiere la instalación manual de FFmpeg en el sistema.

* **Compatibilidad:** Soporta archivos `.mp4` y `.wav`.

* **Tecnología:** Utiliza el modelo `base` de Whisper (ideal para la CPU).

* **Idioma:** Transcripción forzada al español (`language="es"`).

## 🛠️ Requisitos de Instalación

Para ejecutar este proyecto, necesitas **Python 3.8+** y las siguientes librerías:

* `Flask` y `Flask-CORS`: Para configurar la API web.

* `openai-whisper`: El núcleo de transcripción.

* `torch` y `torchaudio`: Para el procesamiento y decodificación portable de archivos (`.mp4` y `.wav`).

* `numpy` y `soundfile`: Para la manipulación de arrays de audio.

### 1. Clona el repositorio

git clone https://docs.github.com/es/repositories/creating-and-managing-repositories/quickstart-for-repositories cd quick-transcribe

### 2. Instalar dependencias

Es **fundamental** que instales todas las dependencias especificadas en el archivo `requirements.txt`. Algunas de estas librerías, como `torch` y `torchaudio`, son grandes.

pip install -r requirements.txt

> **Nota sobre PyTorch:** Si tienes una GPU NVIDIA, considera instalar la versión de PyTorch con soporte CUDA (consulta el sitio oficial de PyTorch).

## 🚀 Uso de la Aplicación (Centrado en la Interfaz)

El proceso de uso se realiza en dos sencillos pasos. El Backend se ejecuta como un servicio y todas las operaciones se realizan desde el Frontend (la interfaz web).

### 1. Iniciar el Servicio de Backend (API)

Primero, inicia el servidor Flask para que la API esté disponible.

Desde la carpeta raíz del proyecto (`quick-transcribe`), ejecuta:

python app.py


El servicio de la API se iniciará en `http://127.0.0.1:5000/`. **Deja esta terminal abierta** mientras usas el Frontend.

### 2. Usar la Interfaz de Usuario (Frontend)

Una vez que el Backend esté corriendo, puedes interactuar con la aplicación.

1. **Asegúrate de que la API de Flask esté corriendo** (Paso 1).

2. **Inicia el Frontend:** Dependiendo de cómo esté construido tu Frontend (React, HTML estático, etc.), ábrelo en tu navegador.

3. **Interacción:** Sube el archivo (`.mp4` o `.wav`) a través de la interfaz web. El Frontend manejará internamente la subida y la llamada al endpoint `/transcribe` de la API para obtener el texto.

## ⚙️ Uso Directo de la API (Solo para Desarrolladores)

Si deseas interactuar directamente con la API sin usar la interfaz web:

| **Método** | **Endpoint** | **Descripción** |
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