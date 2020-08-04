import React, { useState } from "react";
import { QuestionState, Answers, Difficulty, fetchQuestions } from "./api";
import QuestionCard from "./Components/QuestionCard";

import "./App.css";

const totalQuestions = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answers[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const awaitQuestions = await fetchQuestions(
      totalQuestions,
      Difficulty.EASY
    );

    setQuestions(awaitQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;

      // Check user answer against correct answer
      const correct = questions[number].correct_answer === answer;

      // Increase score if user answer is correct
      if (correct) setScore((prev) => prev + 1);

      // Save user answer to array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // If question is not the last, move to next question
    const next = number + 1;

    if (next === totalQuestions) {
      setGameOver(true);
    } else {
      setNumber(next);
    }
  };

  return (
    <div className="ui container">
      <div className="ui segments">
        <h1 className="ui center aligned header">
          Test Your Video Game Knowledge!
        </h1>
        <div className="ui segment">
          {gameOver ? (
            <button className="ui blue button" onClick={startQuiz}>
              Start Quiz
            </button>
          ) : null}
          {userAnswers.length === totalQuestions ? (
            <button className="ui blue button" onClick={startQuiz}>
              Retry Quiz
            </button>
          ) : null}
          {loading ? (
            <div className="ui">
              <div className="ui active loader"></div>
              <p></p>
            </div>
          ) : null}
          {!gameOver ? <h2>Score: {score}</h2> : null}
          {!loading && !gameOver ? (
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={totalQuestions}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          ) : null}
          {!loading &&
          !gameOver &&
          userAnswers.length === number + 1 &&
          number !== totalQuestions - 1 ? (
            <button
              className="ui right labeled icon button"
              onClick={nextQuestion}
            >
              <i className="right arrow icon"></i> Next Question
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
