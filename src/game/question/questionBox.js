import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import ENDPOINTS from "../../constants/endpoints.js";
import QuestionForm from "./questionForm.js";

const QuestionBox = () => {
    const [allQuestionDocIds, setAllQuestionDocIds] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [alreadyUsedIds, setAlreadyUsedIds] = useState([])
    const [questionDocId, setQuestionDocId] = useState(null);
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

    function fetchQuestion(allDocIds, docId = null) {
        if (docId === null) {
            do {
                docId = allDocIds[Math.floor(Math.random() * allDocIds.length)];
            } while (alreadyUsedIds.includes(docId));
        }
        setAlreadyUsedIds([...alreadyUsedIds, docId]);
        setQuestionDocId(docId);
    }

    function CorrectAnswer() {
        return <>
            <p className="rightA">{t('questions.correct_answer')}</p>
        </>
    }

    function WrongAnswer() {
        return <>
            <p className="wrongA">{t('questions.wrong_answer_prompt')}</p>
        </>
    }

    return(<>
        <QuestionForm questionDocId={questionDocId}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}/>

        {isCorrect !== null && ( <>
            {isCorrect ? <CorrectAnswer /> : <WrongAnswer />}
            <button onClick={() => {
                fetchQuestion(allQuestionDocIds);
                setNbQuestions(nbQuestions + 1);
            }} disabled={nbQuestions == allQuestionDocIds.length}>
                {t('questions.new_question')}
            </button></>
        )}
    </>);
}

export default QuestionBox;