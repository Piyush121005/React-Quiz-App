# Quiz App

A simple quiz application built with React.js. The app allows users to take a quiz, track their score, and view a report after completion.

## Features

- Fetches random quiz questions from an external API.
- Users can start the quiz by providing their email.
- Keeps track of time with a countdown timer.
- Allows users to navigate between questions.
- Displays a score and report after completing the quiz.
- Prevents submission until all questions are attempted.

## Demo

You can try out the app by visiting the live demo here: [Insert demo link]

## Screenshots

![Quiz App](![image](https://github.com/user-attachments/assets/57c3f1a0-cb50-4ed4-afca-3f98a1885a11)

## Technologies Used

- React.js
- Axios (for fetching quiz data)
- CSS

## Installation

To run the app locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quiz-app.git
   ```
2. Navigate into the project directory:
   ```bash
   cd quiz-app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## How It Works
- The app fetches 15 random quiz questions from the Open Trivia Database API.
- Users enter their email to start the quiz.
- The timer starts once the quiz begins, with a total time of 15 minutes.
- The user navigates through the questions, answers them, and submits the quiz.
- Upon submitting the quiz, the user is shown a report with their score.

## Files & Components

- App.js: Main component that controls the state and flow of the quiz.
- Header.js: Displays the countdown timer.
- EmailInput.js: Handles email input and quiz start.
- QuestionNavigation.js: Allows navigation between questions.
- Quiz.js: Displays the current question and answer options.
- Report.js: Shows the result after the quiz submission.
