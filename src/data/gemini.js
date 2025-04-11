import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCiU4V9KO9qrdkY00DXQadhuQ3UdG5-a_0",
});

async function run(prompt, setStateCallback) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  try {
    const text = response.text;
    const json = JSON.parse(text);
    console.log("Gemini Response:", json);

    // Set data to context if callback provided
    if (setStateCallback) {
      setStateCallback(json);
    }

    return json;
  } catch (error) {
    console.error("Invalid JSON received:", response.text);
    return null;
  }
}

export default run;
