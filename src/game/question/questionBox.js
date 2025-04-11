import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import QuestionFetcher from "./questionFetcher.js";

const QuestionBox = () => {
    const [isCorrect, setIsCorrect] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [alreadyUsedIds, setAlreadyUsedIds] = useState([])
    const [question, setQuestion] = useState(() => fetchQuestion());
    const [nbQuestions, setNbQuestions] = useState(1);
    const { t } = useTranslation();

    function fetchQuestion() {
        let questionTemp = QuestionFetcher.findQuestion();
        if (alreadyUsedIds.includes(questionTemp.getDocumentId())) {
            questionTemp = fetchQuestion();
        } else {
            setAlreadyUsedIds([...alreadyUsedIds, questionTemp.getDocumentId()]);
        }
        return questionTemp;
    }

    function checkAnswer(event) {
        event.preventDefault();
        const userAnswer = event.currentTarget.elements.answerInput.value;
        setIsCorrect(question.checkAnswer(userAnswer));
        setUserInput(userAnswer);
    }

    function QuestionComponent() {
        return <div>Q: {question.getQuestionTitle()}</div>
    }

    function Answer() {
        return(<>
        <form onSubmit={checkAnswer}>
            <input id="answerInput"
                disabled={isCorrect !== null}/>
            <button type="submit"
            disabled={isCorrect !== null}>V</button>
        </form>
        </>);
    }

    function CorrectAnswer() {
        return <>
            <span className="rightA">
                {userInput.charAt(0).toUpperCase() + userInput.slice(1)}{t('questions.correct_answer')}</span>
        </>
    }

    function WrongAnswer() {
        return <>
            <p className="wrongA">{t('questions.wrong_answer_prompt')}</p>
            <span>{t('questions.wrong_answer_correction')}{question.getAnswer()}</span>
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
                setQuestion(fetchQuestion());
                setNbQuestions(nbQuestions + 1);
            }} disabled={nbQuestions == QuestionFetcher.getNbQuestions()}>
                {t('questions.new_question')}
            </button></>
        )}
    </>);
}

export default QuestionBox;