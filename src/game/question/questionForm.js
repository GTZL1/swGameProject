import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import Question from "./question.js";
import ENDPOINTS from "../../constants/endpoints.js";

const QuestionForm = ({questionDocId, isCorrect, setIsCorrect, answerProps}) => {
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
            <p className="text-xl text-center">{question?.getQuestionTitle()}</p>
        </> 
    }

    function Answer() {
        return(<>
        <form onSubmit={checkAnswer}
            className="flex justify-center items-center mt-2">
            <TextField id="answerInput" variant="outlined"
                {...(question?.getAnswerIndication() !== null ? {label : question?.getAnswerIndication()} : {})}
                disabled={isCorrect !== null}
                {...(userInput.length > 0 ? {value : userInput} : {})} 
                size="small"
                slotProps={{
                    input : {
                        className: "bg-gray-100 rounded-lg text-black"
                    },
                }}
                sx={{
                    width: "60%",
                    "& .MuiInputLabel-root": {
                        color: "gray text-2xs",
                    }
                }}/>
            <button type="submit" className="ml-4"
                disabled={isCorrect !== null}>{t('questions.button')}</button>
        </form>
        </>);
    }

    return(<div className="flex flex-col max-w-[50vw]">
        {(question !== null) &&
            <img src={(`${ENDPOINTS.BACKEND_URL}${question.getImageUrl()}`)} 
                className={`max-h-[50vh] object-contain question-div`} />}    
        <div className={`flex flex-col items-center question-div mt-8 p-3`}>
            <QuestionComponent />
            <Answer />
            {answerProps}
        </div>
    </div>);
}

export default QuestionForm;