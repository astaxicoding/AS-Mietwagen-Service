
import { GoogleGenAI } from "@google/genai";
import { ContactFormData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * Nutzt die kostenlose Nominatim API (OpenStreetMap) für Adressvorschläge.
 * Funktioniert ohne API-Key und ohne Quota-Limits von Gemini.
 */
export const fetchPlaceSuggestions = async (input: string): Promise<{label: string, lat: number, lon: number}[]> => {
  if (!input || input.length < 2) return [];

  try {
    // Bingen am Rhein Koordinaten Bereich für Priorisierung (Viewbox)
    // ca. 7.80, 49.90 bis 8.00, 50.00
    const viewbox = "7.80,50.00,8.00,49.90";
    
    // Wir hängen " Bingen" an, wenn die Eingabe kurz ist und kein Ort enthalten scheint, 
    // um lokale Ergebnisse zu forcieren, aber wir lassen auch allgemeine Suchen zu.
    let query = input;
    const lowerInput = input.toLowerCase();
    if (input.length < 10 && !lowerInput.includes("bingen") && !lowerInput.includes("mainz") && !lowerInput.includes("ingelheim")) {
      query = `${input} Bingen`;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=8&countrycodes=de&viewbox=${viewbox}&bounded=0`;
    
    const response = await fetch(url, {
      headers: { 
        'Accept-Language': 'de',
        'User-Agent': 'AS-Mietwagen-Service-App' // Nominatim bittet um User-Agent
      }
    });
    
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();

    return data.map((item: any) => {
      // Wir kürzen den Label-Text etwas, da Nominatim oft sehr lange Strings liefert
      const parts = item.display_name.split(', ');
      // Nimm die ersten 4-5 Teile für eine lesbare Adresse
      const shortLabel = parts.slice(0, 5).join(', ');
      
      return {
        label: shortLabel,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
      };
    });
  } catch (error) {
    console.error("Nominatim Search Error:", error);
    return [];
  }
};

export const parseBookingRequest = async (userText: string): Promise<Partial<ContactFormData> | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extrahiere Details aus: "${userText}". JSON mit name, date, pickup, destination.`,
      config: { responseMimeType: 'application/json' }
    });
    const text = response.text?.trim();
    if (!text) return {};
    
    // Handle potential markdown blocks
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
    const cleanJson = jsonMatch ? jsonMatch[1] : text;
    
    try {
      return JSON.parse(cleanJson || "{}");
    } catch (e) {
      console.error("Error parsing Gemini JSON:", e);
      return {};
    }
  } catch (error) {
    return null; // Fallback auf manuelle Eingabe
  }
};
