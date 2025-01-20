// components/QuestionNavigation.js
import React from "react";

const QuestionNavigation = ({
    questions,
    currentQuestion,
    navigateToQuestion,
    getButtonClass,
}) => {
    return (
        <div>
            <h3>Question Overview</h3>
            <div>
                {questions.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => navigateToQuestion(index)}
                        className={getButtonClass(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionNavigation;
