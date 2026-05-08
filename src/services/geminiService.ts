
import { GoogleGenAI, Type } from "@google/genai";
import { NarrativeEruption, WorldState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateNarrativeShift(currentState: WorldState): Promise<NarrativeEruption> {
  const prompt = `
    You are the Overseer of Etheria, a digital universe. 
    Current State: 
    Mood: ${currentState.globalMood}
    Weather: ${currentState.weather}
    Trend: ${currentState.trend}
    
    Based on this, evolve the world. Generate a "Narrative Eruption" that shifts the reality. 
    Be surreal, cinematic, and poetic. 
    The lore fragment should be a short, evocative sentence.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mood: { type: Type.STRING, enum: ['Joy' , 'Sorrow' , 'Fear' , 'Anger' , 'Curiosity' , 'Melancholy' , 'Etheric'] },
            weather: { type: Type.STRING, enum: ['Radiance' , 'Void' , 'Storm' , 'Bloom' , 'Mist' , 'Flare'] },
            trend: { type: Type.STRING, description: "A creative name for the current era or vibe." },
            loreFragment: { type: Type.STRING, description: "A surreal observation about the state of the world." },
            intensity: { type: Type.NUMBER, description: "Intensity from 0.1 to 1.0" },
          },
          required: ["mood", "weather", "trend", "loreFragment", "intensity"],
        },
      },
    });

    if (!response.text) throw new Error("No response from Gemini");
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Narrative Shift Error:", error);
    // Fallback to current state if AI fails
    return {
      mood: currentState.globalMood,
      weather: currentState.weather,
      trend: currentState.trend,
      loreFragment: "The echoes of the void whisper of things yet to come.",
      intensity: 0.5
    };
  }
}
