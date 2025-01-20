import React, { useState } from "react";
import "../styles/EmailInput.css";

const EmailInput = ({ email, setEmail, handleStartQuiz }) => {
    const [errorMessage, setErrorMessage] = useState("");

    const validateEmail = (value) => {
        // Basic email regex for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Validate the email and update the error message
        if (value === "") {
            setErrorMessage("Email is required.");
        } else if (!validateEmail(value)) {
            setErrorMessage("Please enter a valid email address.");
        } else {
            setErrorMessage("");
        }
    };

    return (
        <div className = "container">
            <h1>Welcome to the Quiz App</h1>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                style={{
                    borderColor: errorMessage ? "red" : "black",
                    borderWidth: "2px",
                    padding: "10px",
                    borderRadius: "5px",
                }}
            />
            <button
                onClick={handleStartQuiz}
                disabled={!!errorMessage || email === ""}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: !!errorMessage || email === "" ? "grey" : "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: !!errorMessage || email === "" ? "not-allowed" : "pointer",
                }}
            >
                Start Quiz
            </button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
};

export default EmailInput;
