import React from "react";
import "../styles/Quiz.css";

const Quiz = ({ question, options, handleAnswer }) => {
    return (
        <div className="quiz-container">
            <h3 className="question">{question}</h3>
            <ul className="options">
                {options.map((option, index) => (
                    <li
                        key={index}
                        className="option"
                        onClick={() => handleAnswer(option)} // Only pass the option
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Quiz;
