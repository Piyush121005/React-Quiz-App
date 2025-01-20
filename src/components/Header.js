import React from "react";
import "../styles/Header.css"


const Header = ({ timeLeft }) => {
    return (
        <header className = "header">
            <h1>Quiz App</h1>
            <p>
                Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
            </p>
        </header>
    );
};

export default Header;
