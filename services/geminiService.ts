import { GoogleGenAI, Type } from "@google/genai";
import { AiWorkflowResponse } from "../types";

// Note: In a real environment, never expose API keys on the client side.
// This is for demonstration using the provided constraints.
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateWorkflowIdea = async (prompt: string): Promise<AiWorkflowResponse | null> => {
  if (!API_KEY) {
    console.error("API Key missing");
    return null;
  }

  try {
    const model = 'gemini-2.5-flash-preview-12-2025'; // Using a fast model for interactive UI
    
    const systemInstruction = `
      You are an expert n8n automation engineer. 
      Your goal is to design a logical automation workflow based on the user's request.
      Return the response in JSON format describing the title, summary, step-by-step logic, and recommended n8n nodes.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-12-2025',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            steps: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendedNodes: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "summary", "steps", "recommendedNodes"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as AiWorkflowResponse;

  } catch (error) {
    console.error("Error generating workflow:", error);
    return null;
  }
};