import { GoogleGenAI, Type } from "@google/genai";
import { products } from '../data/mockData';

// Always use named parameter and process.env.API_KEY directly as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIShoppingAdvice = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is looking for shopping advice. Current catalog categories are: ${[...new Set(products.map(p => p.category))].join(', ')}. 
      User says: "${userPrompt}"
      
      Suggest specific types of products they should look for and provide a helpful response.`,
      config: {
        systemInstruction: "You are a friendly personal shopper for a budget-friendly e-commerce site like Meesho. Keep your responses concise, helpful, and focused on fashion or household needs. Recommend types of products based on the prompt.",
      }
    });

    // response.text is a property, not a method.
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm sorry, I'm having trouble connecting to my fashion brain. How else can I help you today?";
  }
};

export const getProductRecommendations = async (userQuery: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search query: "${userQuery}". List suitable products from this catalog: ${JSON.stringify(products.map(p => ({ id: p.id, name: p.name, category: p.category })))}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of product IDs that match the query best"
            },
            reasoning: {
              type: Type.STRING,
              description: "Short explanation for these recommendations"
            }
          },
          propertyOrdering: ["recommendedIds", "reasoning"],
        }
      }
    });

    // Directly access text property and handle potential undefined.
    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return { recommendedIds: [], reasoning: "Error getting AI recommendations." };
  }
};