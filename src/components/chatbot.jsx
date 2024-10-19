import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import boneca from "../assets/boneca.png";
import "./chatbot.css";

function Chatbot() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [data, setData] = useState(undefined);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // Estado para controlar o foco no input

  async function fetchDataFromGeminiProAPI() {
    try {
      if (!inputText) {
        alert("Por favor, insira um texto!");
        return;
      }
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(inputText);
      const text = await result.response.text();
      setLoading(false);
      setData(text);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar dados da API do Gemini: ", error);
    }
  }

  return (
    <>
      {(isInputFocused || data) && (
        <div className={`chatBox ${isInputFocused ? '' : 'visible'}`}>
            <img src={boneca} alt="" />
          {data ? data : "Em que posso te ajudar ?"} {/* Mensagem padrão */}
        </div>
      )}
      <div className="card">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite seu texto aqui"
          onFocus={() => setIsInputFocused(true)}  
          onBlur={() => {
            setIsInputFocused(false);
            // Limpa o texto se não houver resposta
            if (!data) {
              setInputText('');
            }
          }}
        />
        {/* O botão só aparece se o input estiver focado */}
        {isInputFocused && (
          <button
            className="buttonChat"
            disabled={loading}
            onClick={fetchDataFromGeminiProAPI}
          >
            <svg
              width="31"
              height="28"
              viewBox="0 0 31 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7903 14.004H5.01981M4.74287 15.2456L3.12865 19.92C2.24455 22.4802 1.8025 23.7602 2.11974 24.5484C2.39521 25.2331 2.9869 25.752 3.71701 25.9496C4.55774 26.177 5.82758 25.6231 8.36725 24.5153L24.6489 17.4126C27.1279 16.3311 28.3673 15.7905 28.7503 15.0393C29.0832 14.3868 29.0832 13.621 28.7503 12.9684C28.3673 12.2174 27.1279 11.6767 24.6489 10.5953L8.33917 3.48042C5.80715 2.37587 4.54115 1.82359 3.70125 2.05015C2.97183 2.2469 2.38021 2.76451 2.10377 3.44781C1.78544 4.23461 2.22276 5.51191 3.09743 8.06651L4.746 12.8815C4.89622 13.3202 4.97134 13.5397 5.00098 13.764C5.0273 13.9632 5.02703 14.1647 5.0002 14.3637C4.96994 14.588 4.89426 14.8071 4.74287 15.2456Z"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {loading ? "Carregando..." : ""}
          </button>
        )}
        <hr />
      </div>
    </>
  );
}

export default Chatbot;
