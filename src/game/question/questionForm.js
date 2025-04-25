import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import Question from "./question.js";
import "./question.css";
import ENDPOINTS from "../../constants/endpoints.js";

const QuestionForm = ({questionDocId, isCorrect, setIsCorrect}) => {
    const [question, setQuestion] = useState(null);
    const [userInput, setUserInput] = useState("");
    const { i18n, t } = useTranslation();

    useEffect(() => {
        if (!questionDocId) return;
        
        fetchQuestion();
        setUserInput("");
        setIsCorrect(null);
    }, [questionDocId]);

    useEffect(() => {
        if (questionDocId) {
            fetchQuestion();
        }
    }, [i18n.language]);

    function fetchQuestion() {
        axios
            .get(`${ENDPOINTS.GET_QUESTION_PER_DOCID}${questionDocId}&locale=${i18n.language}`)
            .then((response) => {
                setQuestion(new Question(
                    response.data.documentId,
                    response.data.questionTitle,
                    response.data.answer,
                    response.data.indication,
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
        setUserInput(question.getAnswer());
    }

    function QuestionComponent() {
        return <>
            <div>Q: {question?.getQuestionTitle()}</div>
            {question?.getAnswerIndication() !== null && <div id="indication">{question?.getAnswerIndication()}</div>}
        </> 
    }

    function Answer() {
        return(<>
        <form onSubmit={checkAnswer}>
            <input id="answerInput"
                disabled={isCorrect !== null}
                {...(userInput.length > 0 ? {value : userInput} : {})}/>
            <button type="submit"
            disabled={isCorrect !== null}>V</button>
        </form>
        </>);
    }

    return(<>
        { (question !== null && question.getImageUrl().length > 0) &&
        <img src={(`${ENDPOINTS.BACKEND_URL}${question.getImageUrl()}`)} />}    
        <QuestionComponent />
        <Answer />
    </>);
}

export default QuestionForm;