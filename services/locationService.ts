
import { ContactFormData } from "../types";

/**
 * Nutzt die kostenlose Nominatim API (OpenStreetMap) für Adressvorschläge.
 * Funktioniert ohne API-Key.
 */
export const fetchPlaceSuggestions = async (input: string): Promise<{label: string, lat: number, lon: number}[]> => {
  if (!input || input.length < 2) return [];

  try {
    // Bingen am Rhein Koordinaten Bereich für Priorisierung (Viewbox)
    // ca. 7.80, 49.90 bis 8.00, 50.00
    const viewbox = "7.80,50.00,8.00,49.90";
    
    let query = input;
    const lowerInput = input.toLowerCase();
    if (input.length < 10 && !lowerInput.includes("bingen") && !lowerInput.includes("mainz") && !lowerInput.includes("ingelheim")) {
      query = `${input} Bingen`;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=8&countrycodes=de&viewbox=${viewbox}&bounded=0`;
    
    const response = await fetch(url, {
      headers: { 
        'Accept-Language': 'de',
        'User-Agent': 'AS-Mietwagen-Service-App'
      }
    });
    
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();

    return data.map((item: any) => {
      const parts = item.display_name.split(', ');
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
