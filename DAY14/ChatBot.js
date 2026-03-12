require("dotenv").config();
const { GoogleGenAI } =  require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: msg
  });

  console.log(response.text);
  return response.text;
}

module.exports = main;