import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import Question from "./question.js";
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
            <p>{question?.getQuestionTitle()}</p>
        </> 
    }

    function Answer() {
        return(<>
        <form onSubmit={checkAnswer}
            className="flex justify-center items-center">
            <TextField id="answerInput" variant="outlined"
                {...(question?.getAnswerIndication() !== null ? {label : question?.getAnswerIndication()} : {})}
                disabled={isCorrect !== null}
                {...(userInput.length > 0 ? {value : userInput} : {})} 
                size="small"
                slotProps={{
                    input : {
                        className: "bg-gray-100 rounded-lg text-black w-[80%]"
                    }
                }}
                sx={{
                    "& .MuiInputLabel-root": {
                        color: "gray",
                    },
                }}/>
            <button type="submit"
            disabled={isCorrect !== null}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700">
                {t('questions.button')}</button>
        </form>
        </>);
    }

    const questionStyle = "bg-slate-400/[.90] rounded-2xl outline outline-4 outline-cyan-600 outline-offset-4";
    return(<div className="flex flex-col">
        {(question !== null) &&
            <img src={(`${ENDPOINTS.BACKEND_URL}${question.getImageUrl()}`)} 
                className={`max-h-[50vh] max-w-[60vw] object-contain ${questionStyle}`} />}    
        <div className={`flex flex-col items-center content-center ${questionStyle} mt-8 p-3`}>
            <QuestionComponent />
            <Answer />
        </div>
    </div>);
}

export default QuestionForm;