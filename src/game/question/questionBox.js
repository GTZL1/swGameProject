import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import ENDPOINTS from "../../constants/endpoints.js";
import QuestionForm from "./questionForm.js";

const QuestionBox = () => {
    const [allQuestionDocIds, setAllQuestionDocIds] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [alreadyUsedIds, setAlreadyUsedIds] = useState([]);
    const [questionDocId, setQuestionDocId] = useState(null);
    const [nbQuestions, setNbQuestions] = useState(1);
    const { t } = useTranslation();

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

    function answerMessage(isCorrect) {
        return (isCorrect ? t('questions.correct_answer') : t('questions.wrong_answer_prompt'));
    }

    return(<>
        <QuestionForm questionDocId={questionDocId}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
        answerProps=
            {isCorrect !== null ? (<>
                <p className="my-2">
                    {answerMessage(isCorrect)}</p>
                <button onClick={() => {
                    fetchQuestion(allQuestionDocIds);
                    setNbQuestions(nbQuestions + 1);
                }} disabled={nbQuestions == allQuestionDocIds.length}>
                    {t('questions.new_question')}
                </button></>
            ) : <></>} />
    </>);
}

export default QuestionBox;