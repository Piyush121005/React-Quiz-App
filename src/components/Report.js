import React from "react";
import "../styles/Report.css";

const Report = ({ userAnswers, score, resetQuiz }) => {
    return (
        <div>
            <h1 className="score-title">Your Quiz Report</h1>
            <h2 className="final-score">Your Score: {score}</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Your Answer</th>
                        <th>Correct Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {userAnswers.map((answer, index) => (
                        <tr key={index}>
                            <td>{answer.question}</td>
                            <td>{answer.selectedOption}</td>
                            <td>{answer.correctAnswer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={resetQuiz} className="back-to-start">
                Back to Start
            </button>
        </div>
    );
};

export default Report;
