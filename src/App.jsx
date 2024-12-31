import { useEffect, useState } from "react"

export default function App() {
  // Boolean States
  const [playGame, setPlayGame] = useState(false);
  const [loading, setLoading] = useState(false);

  // Numerical States
  const [score, setScore] = useState(0);

  // Array States
  const [questions, setQuestions] = useState([]);

  // Helper/Handler functions
  const togglePlayGame = () => {
    setPlayGame(!playGame);
  };

  const fetchQuestions = async () => {
    setLoading(true);
    await delay(3000); // Simulate a delay
    try {
      const response = await fetch("./src/assets/qna.json");
      const data = await response.json();
      setQuestions(data); // Set questions in state
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false); // Always happens
    }
  };

  // Trigger fetchQuestions when playGame state changes to true
  useEffect(() => {
    if (playGame) {
      fetchQuestions();
    }
  }, [playGame]);

  return (
    <>
      <header>
        <h1>Quiz App</h1>
      </header>

      <main>
        {!playGame ? (
          <button onClick={togglePlayGame}>Play Game</button>
        ) : (
          // Loading Screen
          loading ? (
            <p>Loading questions...</p>
          ) : (
            questions.length > 0 ? (
              questions.map((question) => (
                <Question
                  key={question.id}
                  id={question.id}
                  content={question.content}
                  options={question.options}
                  correct={question.correct}
                />
              ))
            ) : (
              <p>Sorry! No questions available :(</p>
            )
          )
        )}
      </main>

      <footer>
        <h4><a href="#">Alex Biswas</a></h4>
      </footer>
    </>
  );
}

// Question Component
function Question({ id, content, options, correct }) {
  return (
    <div className="Question">
      <label htmlFor={`question-${id}`}>{content}</label>
      <select name={`question-${id}`}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>Correct: {correct}</p>
    </div>
  );
}

/**
 * A wrapper function to mimic time delay asynchronously
 * 
 * @param {Number} ms - The time in milliseconds to delay
 * @returns A promise which always resolves
 */
function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
