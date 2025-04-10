import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import QuestionFetcher from "./questionFetcher.js";

const QuestionBox = () => {
    const [isCorrect, setIsCorrect] = useState(null);
    const [userInput, setUserInput] = useState("");
    const { i18n,t } = useTranslation();

    const question = QuestionFetcher.findQuestion();

    function checkAnswer(event) {
        event.preventDefault();
        const userAnswer = event.currentTarget.elements.answerInput.value;
        setIsCorrect(question.checkAnswer(userAnswer));
        setUserInput(userAnswer);
    }

    function QuestionComponent() {
        return <div>Q: {question.getText()}</div>
    }

    function Answer() {
        return(<>
        <form onSubmit={checkAnswer}>
            <input id="answerInput"
                disabled={isCorrect !== null}/>
            <button type="submit">V</button>
        </form>
        </>);
    }

    function CorrectAnswer() {
        return <>
            <span className="rightA">
                {userInput.charAt(0).toUpperCase() + userInput.slice(1)}... that is correct ! Well done !</span>
        </>
    }

    function WrongAnswer() {
        return <>
            <p className="wrongA">Too bad, you're wrong this time...</p>
            <span>Correct answer was {question.getAnswer()}</span>
        </>
    }

    return(<>
        <QuestionComponent />
        <Answer />
        {isCorrect !== null && ( <>
            {isCorrect ? <CorrectAnswer /> : <WrongAnswer />}
            <button onClick={() => {
                setIsCorrect(null);
                setUserInput("");
            }}
            >New question</button>
            </>
        )}
    </>);
}

export default QuestionBox;