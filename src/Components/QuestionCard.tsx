import React from "react";
import { Answers } from "../api";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: Answers | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div>
      <h3>
        Question: {questionNumber} / {totalQuestions}
      </h3>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div className="ui buttons">
        {answers.map((answer) => (
          <div key={answer}>
            <button
              className="ui button"
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
