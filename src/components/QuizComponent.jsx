import { useEffect, useState } from "react";

function QuizComponent() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetch(URL, {
      headers: {
        "X-Master-Key": API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.record);
        setQuestions(data.record);
      })
      .catch((err) => console.error(err));
  }, [URL, API_KEY]);

  const handleAnswer = (index) => {
    if (selected !== null) return; // evita doble click

    setSelected(index);

    if (index === questions[current].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setSelected(null);

      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  if (!Array.isArray(questions) || questions.length === 0) {
    return <p>Cargando preguntas...</p>;
  }

  if (finished) {
    return (
      <div>
        <h2>🎉 Resultado final</h2>
        <p>
          Puntaje: {score} / {questions.length}
        </p>

        <button
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setFinished(false);
          }}
        >
          Reiniciar Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Quiz Cultura General</h1>

      <h2>{questions[current]?.question}</h2>

      <div>
        {questions[current]?.answers.map((ans, i) => {
          let bg = "";

          if (selected !== null) {
            if (i === questions[current].correctAnswer) {
              bg = "green";
            } else if (i === selected) {
              bg = "red";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              style={{
                backgroundColor: bg,
                margin: "5px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              {ans}
            </button>
          );
        })}
      </div>

      <p>
        Pregunta {current + 1} de {questions.length}
      </p>
    </div>
  );
}

export default QuizComponent;