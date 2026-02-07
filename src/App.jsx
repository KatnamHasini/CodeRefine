import { useState } from "react";
import CodeInput from "./components/CodeInput";
import ResultDisplay from "./components/ResultDisplay";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setResult(null); // Clear previous result

    try {
      const res = await fetch("http://127.0.0.1:8000/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to fetch analysis");
      }

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing code:", error);
      alert(`Error: ${error.message}. Ensure backend is running.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>CodeRefine AI</h1>
        <p>Intelligent Code Analysis & Optimization</p>
      </header>

      <main className={`main-content ${!result ? 'no-result' : ''}`}>
        <CodeInput
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          analyzeCode={analyzeCode}
          loading={loading}
        />

        {result && (
          <ResultDisplay result={result} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
