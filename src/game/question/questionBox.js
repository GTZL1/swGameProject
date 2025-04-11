import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import QuestionFetcher from "./questionFetcher.js";
import Question from "./question.js";

const QuestionBox = () => {
    const [allQuestionDocIds, setAllQuestionDocIds] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [alreadyUsedIds, setAlreadyUsedIds] = useState([])
    const [question, setQuestion] = useState(null);
    const [nbQuestions, setNbQuestions] = useState(1);
    const { t } = useTranslation();

    useEffect(() => {
        axios
         .get('http://localhost:1337/api/question-api/all')
         .then((response) => {
            setAllQuestionDocIds(response.data);
            fetchQuestion(response.data);
         })
         .catch((error) => {
            console.log(error);
         });
    }, []);

    function fetchQuestion(allDocIds) {
        let docId = null;
        console.log(allDocIds);

        do {
            docId = allDocIds[Math.floor(Math.random() * allDocIds.length)];
        } while (alreadyUsedIds.includes(docId));

        setAlreadyUsedIds([...alreadyUsedIds, docId]);
        
        axios
            .get('http://localhost:1337/api/question-api/docId?documentId=' + docId)
            .then((response) => {
                setQuestion(new Question(response.data.documentId,
                    response.data.questionTitle, response.data.answer));
            })
            .catch((error) => {
            console.log(error);
            });
    }

    function checkAnswer(event) {
        event.preventDefault();
        const userAnswer = event.currentTarget.elements.answerInput.value;
        setIsCorrect(question.checkAnswer(userAnswer));
        setUserInput(userAnswer);
    }

    function QuestionComponent() {
        return <div>Q: {question?.getQuestionTitle()}</div>
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
                fetchQuestion(allQuestionDocIds);
                setNbQuestions(nbQuestions + 1);
            }} disabled={nbQuestions == allQuestionDocIds.length}>
                {t('questions.new_question')}
            </button></>
        )}
    </>);
}

export default QuestionBox;