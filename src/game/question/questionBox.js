import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import Question from "./question.js";
import "./question.css";
import ENDPOINTS from "../../constants/endpoints.js";

const QuestionBox = () => {
    const [allQuestionDocIds, setAllQuestionDocIds] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [alreadyUsedIds, setAlreadyUsedIds] = useState([])
    const [question, setQuestion] = useState(null);
    const [nbQuestions, setNbQuestions] = useState(1);
    const { i18n,t } = useTranslation();

    useEffect(() => {
        axios
         .get(`${ENDPOINTS.GET_ALL_QUESTION_DOCIDS}`)
         .then((response) => {
            setAllQuestionDocIds(response.data);
            fetchQuestion(response.data);
         })
         .catch((error) => {
            console.log(error);
         });
    }, []);

    useEffect(() => {
        if (allQuestionDocIds.length > 0) {
            fetchQuestion(allQuestionDocIds, question.getDocumentId());
        }
    }, [i18n.language]);

    function fetchQuestion(allDocIds, docId = null) {
        if (docId === null) {
            do {
                docId = allDocIds[Math.floor(Math.random() * allDocIds.length)];
            } while (alreadyUsedIds.includes(docId));
        }
        
        setAlreadyUsedIds([...alreadyUsedIds, docId]);
        
        axios
            .get(`${ENDPOINTS.GET_QUESTION_PER_DOCID}${docId}&locale=${i18n.language}`)
            .then((response) => {
                setQuestion(new Question(
                    response.data.documentId,
                    response.data.questionTitle,
                    response.data.answer,
                    response.data.image));
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
            <span className="rightA"><br/>
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
        { (question !== null && question.getImageUrl().length > 0) &&
        <img src={'http://localhost:1337' + question.getImageUrl()} />}    
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