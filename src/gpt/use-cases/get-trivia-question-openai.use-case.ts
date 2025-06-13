import { CreateTopicDto } from '../../topic/dto/create-topic.dto';
import OpenAI from 'openai';

export interface QuestionInterface {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

export const getTriviaQuestionOpenAiUseCase = async (
  ai: OpenAI,
  dto: CreateTopicDto,
) => {
  const { description } = dto;

  const systemPrompt = `
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
`;

  const userPrompt = `Dame una pregunta de conocimiento general sobre: ${description}`;

  const response = await ai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: Math.random() * 0.5 + 0.5,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  });

  const rawText = response.choices[0].message.content ?? '';

  let jsonResponse: QuestionInterface;

  try {
    jsonResponse = JSON.parse(rawText);
  } catch {
    throw new Error(`Error al parsear la respuesta de OpenAI: ${rawText}`);
  }

  return jsonResponse;
};
