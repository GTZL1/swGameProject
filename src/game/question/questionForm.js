import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import Question from "./question.js";
import ENDPOINTS from "../../constants/endpoints.js";
import InfoBubble from "../help/infoBubble.js";
import { useFont } from '../../context/FontContext.js';
import { FLAG_FILES, FONT_NAME_PART_TO_REMOVE } from "../../constants/constants.js";
import LoadingScreen from "../help/loadingScreen.js";

const QuestionForm = ({questionDocId, isCorrect, setIsCorrect, answerProps}) => {
    const [question, setQuestion] = useState(null);
    const [userInput, setUserInput] = useState("");
    const { i18n, t } = useTranslation();
    const { contentFont } = useFont();
    const [loading, setLoading] = useState(true);

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
        setLoading(true);
        axios
            .get(`${ENDPOINTS.GET_QUESTION_PER_DOCID}${questionDocId}&locale=${i18n.language}`)
            .then((response) => {
                setQuestion(new Question(
                    response.data.documentId,
                    response.data.questionTitle,
                    response.data.answer,
                    response.data.indication,
                    response.data.imageUrl));
                    setLoading(false);
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
            className="flex flex-col sm:flex-row justify-center items-center mt-2">
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
                    width: {
                        xs: "90%",
                        sm: "60%"
                    },
                    "& .MuiInputBase-input": {
                        fontFamily: `${contentFont.replace(FONT_NAME_PART_TO_REMOVE, '')}, sans-serif`,
                    },
                    "& .MuiInputLabel-root": {
                        fontFamily: `${contentFont.replace(FONT_NAME_PART_TO_REMOVE, '')}, sans-serif`,
                        color: "gray text-2xs",
                    }
                }} />
            <button type="submit" className="sm:ml-4 mt-2 sm:mt-0"
                disabled={isCorrect !== null}>{t('questions.button')}</button>
        </form>
        </>);
    }

    return(<div className="flex flex-col max-w-[50vw] items-center">
         {loading ? <LoadingScreen flagFiles = {FLAG_FILES} /> : <>
            {(question !== null) &&
                <img src={(`${ENDPOINTS.IMAGE_BACKEND_URL}${question.getImageUrl()}`)} 
                    className={`max-h-[50vh] object-contain question-div`} />}    
            <div className={`flex flex-col items-center question-div mt-8 mb-4 p-3`}>
                <QuestionComponent />
                <Answer />
                {answerProps}
            </div>
            {isCorrect === null &&
                <InfoBubble helpMessage={t('questions.help_message')} />}
        </>}
    </div>);
}

export default QuestionForm;