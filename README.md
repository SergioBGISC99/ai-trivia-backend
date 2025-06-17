# 🧠 AI-Trivias Backend

Backend desarrollado para generar y administrar preguntas de trivia dinámicamente utilizando modelos de lenguaje como **Gemini** y **OpenAI**

## 🚀 Tecnologías utilizadas

- **NestJS**
- **TypeScript**
- **PostgreSQL + TypeORM**
- **Docker**

## 📂 Estructura de directorios

```
src/
|--database/  # Configuración de conexión
|--gemini/    # Servicio para consumir Gemini
|--gpt/       # Servicio para consumir OpenAI
|--question/  # CRUD y lógica de preguntas
|--topic/     # CRUD y lógica de temas
```

## 📦 Instalación

```bash
git clone https://github.com/SergioBGISC99/ai-trivia-backend.git
cd ai-trivias-backend
npm install
```

## ⚙️ Configuración

1. Clonar archivo `.env.template` y renombrarlo a `.env`

2. Obtener API Keys

- [Gemini API Key](https://aistudio.google.com/apikey)
- [OpenAI API Key](https://platform.openai.com/api-keys)

3. Completar variables de entorno

## 🛠️ Uso

```bash
docker compose up -d
npm run start:dev
```

## 📤 Endpoint principales

| Método | Ruta                    | Descripción                                      |
| ------ | ----------------------- | ------------------------------------------------ |
| GET    | /gemini/question/:topic | Genera una nueva pregunta por tema usando Gemini |
| GET    | /gpt/question/:topic    | Genera una nueva pregunta por tema usando OpenAI |

## 🧹 Limpieza automática

Una tarea programada elimina diariamente las preguntas con más de 7 días de antigüedad usando `@nestjs/schedule`.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🤓 Autor

Sergio Barreras
