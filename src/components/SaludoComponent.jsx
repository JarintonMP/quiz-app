import { useState, useEffect } from "react";

export default function SaludoComponent() {
  const frasesLocales = [
    "Sigue adelante 💪",
    "Nunca te rindas 🚀",
    "Confía en ti 🙌",
    "El éxito es constancia 🎯",
    "Tú puedes lograrlo 🔥",
  ];

  const [phrase, setPhrase] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        const res = await fetch("https://www.positiveapi.online/phrases/esp");
        const data = await res.json();

        setPhrase(data);
        setRandomNumber(Math.floor(Math.random() * data.length));
      } catch {
        console.error("API caída, usando fallback");

        const index = Math.floor(Math.random() * frasesLocales.length);
        setFallbackIndex(index);
      }
    };

    fetchPhrase();
  }, []);

  return (
    <div>
      <h1>Hola Clase 👋</h1>

      <p>
        {phrase.length > 0
          ? phrase[randomNumber]?.text
          : frasesLocales[fallbackIndex]}
      </p>
    </div>
  );
}