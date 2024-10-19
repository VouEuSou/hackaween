import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

import "./chatbot.css";

function Chatbot() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [data, setData] = useState(undefined);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchDataFromGeminiProAPI() {
    try {
      if (!inputText) {
        alert("Please enter text!");
        return;
      }
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(inputText);
      const text = result.response.text();
      setLoading(false);
      setData(text);
    } catch (error) {
      setLoading(false);
      console.error("fetchDataFromGeminiAPI error: ", error);
    }
  }

  return (
    <>
      <div className="card">
        <input
          type="text"
          style={{ width: 400 }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {" | "}
        <button disabled={loading} onClick={() => fetchDataFromGeminiProAPI()}>
          {loading ? "Loading..." : "Get PRO data"}
        </button>
        <hr />
        <div>Response: {data}</div>
      </div>
    </>
  );
}

export default Chatbot;
