import { GoogleGenAI } from '@google/genai';
import { CreateTopicDto } from '../../topic/dto/create-topic.dto';

export interface QuestionInterface {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

export const getTriviaQuestionGeminiUseCase = async (
  ai: GoogleGenAI,
  dto: CreateTopicDto,
) => {
  const { description } = dto;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: `Dame una pregunta de conocimiento general sobre: ${description}`,
    config: {
      responseMimeType: 'application/json',

      systemInstruction: `
Eres un generador de preguntas de trivia. Debes crear una sola pregunta original y diferente de conocimiento general sobre el tema proporcionado.

Sigue estrictamente este formato:

{
  "question": "texto de la pregunta",
  "answers": ["respuesta 1", "respuesta 2", "respuesta 3", "respuesta 4"],
  "correctAnswerIndex": número del índice de la respuesta correcta (entre 0 y 3)
}

Reglas:
– La pregunta debe ser diferente a las preguntas más comunes.
– Alterna entre preguntas fáciles, medianas y muy difíciles.
– Cambia el estilo de redacción en cada respuesta (usa "¿Cuál es...?", "¿Cómo se llama...?", "¿En qué año...?" etc).
– Mezcla el orden de las respuestas de manera aleatoria.
– Asegúrate de que la respuesta correcta **no siempre esté en la misma posición** (ni siempre en el índice 0).
– No repitas preguntas anteriores.
– Solo devuelve el JSON, sin explicaciones.
– Ortografía y redacción impecables.
– Claridad, precisión y coherencia gramatical.
– Un estilo natural y fluido en español.
– El JSON debe ser válido, sin comillas extra ni texto adicional fuera del objeto.
`,
    },
  });

  const jsonResponse: QuestionInterface = JSON.parse(response.text ?? '');

  return jsonResponse;
};
