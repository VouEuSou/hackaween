import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect, useRef } from "react";
import boneca from "../assets/boneca.png";
import "./chatbot.css";

function Chatbot() {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [data, setData] = useState(undefined);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const inputRef = useRef(null);

  // Texto fixo que será concatenado com o input do usuário
  const fixedText = "Tenha um limite de 200 caracteres para a melhor experiência!, sem formatação de texto, por favor., e sem colocar * nos textos";

  async function fetchDataFromGeminiProAPI() {
    try {
      if (!inputText) {
        alert("Por favor, insira um texto!");
        return;
      }
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const fullText = fixedText + inputText;

      const result = await model.generateContent(fullText);
      const text = await result.response.text();
      setData(text);
      setIsChatActive(true);
    } catch (error) {
      console.error("Erro ao buscar dados da API do Gemini: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsChatActive(false);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div className={`chatBox ${isChatActive ? 'visible' : 'hidden'}`}>
        <div className="boneca">
          <img src={boneca} alt="Boneca" />
          <div>
            <h2>MarIA</h2>
            <p>Assistente Digital</p>
          </div>
        </div>
        <div className="data">
          {loading ? "Deixe eu procurar pra você..." : (data || "Em que posso te ajudar ?")}
        </div>
      </div>
      <div className="card">
        <input
          type="text"
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite seu texto aqui"
          onFocus={() => {
            setIsChatActive(true);
          }}
        />
        {isChatActive && (
          <button
            className="buttonChat"
            disabled={loading}
            onClick={() => {
              fetchDataFromGeminiProAPI();
              inputRef.current.focus();
            }}
          >
            {loading ? (
              <svg
                width="31"
                height="28"
                viewBox="0 0 31 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="14.5" cy="14" r="12" stroke="white" strokeWidth="3" />
                <path d="M26 14C26 20.6274 20.6274 26 14 26C7.37258 26 2 20.6274 2 14C2 7.37258 7.37258 2 14 2" stroke="white" strokeWidth="3" />
                <circle cx="14" cy="14" r="10" fill="white" />
              </svg>
            ) : (
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
            )}
            {loading ? "Carregando..." : ""}
          </button>
        )}
        <hr />
      </div>
    </>
  );
}

export default Chatbot;
