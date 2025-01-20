import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./components/Header";
import EmailInput from "./components/EmailInput";
import QuestionNavigation from "./components/QuestionNavigation";
import Quiz from "./components/Quiz";
import Report from "./components/Report";
import "./styles/App.css";

const App = () => {
    const [questions, setQuestions] = useState([]); // Store the quiz questions
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question index

    const [score, setScore] = useState(0); // Track user's score
    const [email, setEmail] = useState(""); // Store user's email

    const [quizStarted, setQuizStarted] = useState(false); // Flag to check if quiz has started
    const [timeLeft, setTimeLeft] = useState(15 * 60); // Timer for the quiz (15 minutes)

    const [visitedQuestions, setVisitedQuestions] = useState([]); // Track visited questions
    const [attemptedQuestions, setAttemptedQuestions] = useState([]); // Track attempted questions

    const [userAnswers, setUserAnswers] = useState([]); // Store the user's answers
    const [showReport, setShowReport] = useState(false); // Flag to show report after quiz completion

    // Fetch quiz questions from API when the component mounts
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    "https://opentdb.com/api.php?amount=15"
                );

                // Shuffle the options (correct and incorrect) for each question
                const shuffledQuestions = response.data.results.map((question) => {
                    const shuffledOptions = [
                        question.correct_answer,
                        ...question.incorrect_answers,
                    ];

                    // Fisher-Yates Shuffle to randomize the options order
                    for (let i = shuffledOptions.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffledOptions[i], shuffledOptions[j]] = [
                            shuffledOptions[j],
                            shuffledOptions[i],
                        ];
                    }
                    return { ...question, shuffledOptions }; 
                });

                setQuestions(shuffledQuestions); // Update state with shuffled questions
            } catch (error) {
                console.error("Error fetching quiz data:", error); // Handle error if fetching fails
            }
        };

        fetchQuestions(); // Call function to fetch questions
    }, []); // Empty dependency array ensures this effect runs only once

    
    const handleSubmitQuiz = useCallback(() => {
        // Check if all questions have been attempted before submitting
        if (attemptedQuestions.length === questions.length) {
            setQuizStarted(false); // End the quiz
            setShowReport(true); // Show the report
        } else {
            alert("Please attempt all questions before submitting the quiz.");
        }
    }, [attemptedQuestions, questions.length]); // Recreate the function if attempted or total questions change

    // Timer logic that runs only when the quiz has started
    useEffect(() => {
        if (quizStarted) {
            // Set an interval to decrease the timer by 1 every second
            const timerInterval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(timerInterval); // Clear the interval when time runs out
                        handleSubmitQuiz(); // Submit quiz when time is up
                    }
                    return prevTime - 1; // Decrease time by 1 second
                });
            }, 1000);

            // Cleanup the interval when the quiz ends or component unmounts
            return () => clearInterval(timerInterval);
        }
    }, [quizStarted, handleSubmitQuiz]); 

    const handleAnswer = (selectedOption) => {
        const correctAnswer = questions[currentQuestion].correct_answer;

        // Only process the answer if the question has not been attempted yet
        if (!attemptedQuestions.includes(currentQuestion)) {
            
            if (selectedOption === correctAnswer) {
                setScore(score + 1);
            }

            // Record the user's answer for this question
            setUserAnswers([
                ...userAnswers,
                {
                    question: questions[currentQuestion].question,
                    selectedOption,
                    correctAnswer,
                },
            ]);
            setAttemptedQuestions([...attemptedQuestions, currentQuestion]);
        }

        setVisitedQuestions([...visitedQuestions, currentQuestion]);

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // Start the quiz when email is provided
    const handleStartQuiz = () => {
        if (email) {
            setQuizStarted(true); // Set quiz to started
        } else {
            alert("Please enter your email to start the quiz.");
        }
    };

    // Reset the quiz state when restarting
    const resetQuiz = () => {
        setQuestions([]);
        setCurrentQuestion(0); 
        setScore(0); 
        setEmail(""); 
        setQuizStarted(false); 
        setTimeLeft(15 * 60); 
        setVisitedQuestions([]); 
        setAttemptedQuestions([]); 
        setUserAnswers([]); 
        setShowReport(false); 
    };

    // Navigate to a specific question
    const navigateToQuestion = (index) => {
        setCurrentQuestion(index);
    };

    // Determine the button class (e.g., 'visited', 'attempted') for each question in navigation
    const getButtonClass = (index) => {
        if (attemptedQuestions.includes(index)) {
            return "attempted"; // Return 'attempted' class if question is attempted
        } else if (visitedQuestions.includes(index)) {
            return "visited"; // Return 'visited' class if question is visited
        } else {
            return ""; // Return default class if neither attempted nor visited
        }
    };

    // If the quiz is completed, show the report
    if (showReport) {
        return <Report userAnswers={userAnswers} score={score} resetQuiz={resetQuiz} />;
    }

    // If the quiz hasn't started, show the email input form
    if (!quizStarted) {
        return (
            <EmailInput
                email={email}
                setEmail={setEmail}
                handleStartQuiz={handleStartQuiz}
            />
        );
    }

    if (questions.length === 0) {
        return <h2>Loading...</h2>;
    }

    const currentQ = questions[currentQuestion];
    const options = currentQ.shuffledOptions;

    return (
        <div>
            <Header timeLeft={timeLeft} />
            <QuestionNavigation
                questions={questions}
                currentQuestion={currentQuestion}
                navigateToQuestion={navigateToQuestion}
                getButtonClass={getButtonClass}
            />
            <Quiz
                question={currentQ.question}
                options={options}
                handleAnswer={handleAnswer}
            />
            <button onClick={handleSubmitQuiz} className="submit-quiz">Submit Quiz</button>
        </div>
    );
};

export default App;
