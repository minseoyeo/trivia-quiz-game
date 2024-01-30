import { useState, useEffect } from "react";
import he from "he";

const API_URL = "https://opentdb.com/api.php?amount=50&category=9&type=boolean";

const Main = () => {

  const buttonStyle = `text-montserrat sm:text-xl xl:text-3xl text-white font-semibold py-1 sm:py-2 xl:py-3 px-3 sm:px-4 xl:px-5 rounded-md bg-gray tracking-widest mx-3`;

  const [ questions, setQuestions ] = useState([]);
  const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0);
  const [ score, setScore ] = useState(0);
  const [ selectedDifficulty, setSelectedDifficulty ] = useState("easy");
  const [ feedback, setFeedback ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const decodedQuestions = data.results.map((question) => ({
          ...question,
          question: he.decode(question.question)
        }));
        setQuestions(decodedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchData();
    
  }, [selectedDifficulty]);

  const handleAnswer = (userAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer === "True";

    if (userAnswer === correctAnswer) {
      setFeedback("Correct!");
      setScore(score + 1);
    } else {
      setFeedback("Wrong!");
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 4000);
  };

  const handleDifficulty = (event) => {
    setSelectedDifficulty(event.target.value);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple">
      <div className="bg-black-primary-200 rounded-xl w-4/5 px-3 sm:px-5 xl:px-8 py-5 xl:py-9">
        <h1
          className="text-2xl sm:text-3xl xl:text-5xl font-merriweather font-bold border-b-2 pb-1 xl:pb-3 border-b-black-primary-300 border-solid text-white"
        >Trivia Quiz</h1>
        <div className="font-montserrat">
          <div className="flex justify-between font-semibold p-3 sm:p-4 sm:text-xl xl:text-3xl">
            <select
              id="difficulty"
              value={selectedDifficulty}
              onChange={handleDifficulty}
              className="bg-black-primary-200 text-white text-center p-1 border-2 border-white rounded-md"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <h3 className="text-white">Score: {score}</h3>
          </div>

          <div>
            <h4
              className="font-semibold text-center tracking-wide text-xl sm:text-3xl xl:text-5xl text-purple-blue px-1 xl:py-8 sm:pb-1"
            >
              {questions.length > 0 && questions[currentQuestionIndex].question}
            </h4>

            <div className="flex justify-center py-3">
              <button onClick={() => handleAnswer(true)} className={buttonStyle}>TRUE</button>
              <button onClick={() => handleAnswer(false)} className={buttonStyle}>FALSE</button>
            </div>

            {feedback && <div className="text-center text-white text-2xl sm:text-3xl xl:text-5xl font-semibold tracking-wide">{feedback}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main