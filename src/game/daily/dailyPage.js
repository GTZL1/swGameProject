import React, { useState, useEffect, useRef } from 'react';
import TitleBar from '../../utils/title/title.js';
import { useTranslation } from 'react-i18next';
import SENTENCES from '../../constants/sentences.js';
import axios from 'axios';
import ENDPOINTS from '../../constants/endpoints.js';
import IdentityForm from '../identity/identityForm.js';
import QuestionForm from '../question/questionForm.js';

export const NUMBER_DAILY_QUESTIONS = 4;
export const NUMBER_DAILY_CHARACTERS = 2;

const DailyPage = () => {
    const [questionDocIds, setQuestionDocIds] = useState([]);
    const [charDocIds, setCharDocIds] = useState([]);
    const { i18n, t } = useTranslation();
    const effectRan = useRef(false);
    const [currentId, setCurrentId] = useState(0);
    const [allCorrect, setAllCorrect] = useState(false);
    const [isNoob, setIsNoob] = useState(false);
    
    useEffect(() => {
        if (effectRan.current) return;
        effectRan.current = true;

        const date = new Date().toISOString().split('T')[0];
        axios
            .get(`${ENDPOINTS.DAILY_CHARACTERS}`)
            .then((response) => {
                if (response.data.data.length < 1 ||
                    date > response.data.data[0].date) {
                        chooseSomeIds(`${ENDPOINTS.GET_ALL_CHARACTER_DOCIDS}`, `${ENDPOINTS.DAILY_CHARACTERS}`,
                            NUMBER_DAILY_CHARACTERS, date, setCharDocIds);
                } else {
                    setCharDocIds(response.data.data[0].docIds.split(","));
                }
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(`${ENDPOINTS.DAILY_QUESTIONS}`)
            .then((response) => {
                if (response.data.data.length < 1 ||
                    date > response.data.data[0].date) {
                    chooseSomeIds(`${ENDPOINTS.GET_ALL_QUESTION_DOCIDS}`, `${ENDPOINTS.DAILY_QUESTIONS}`,
                        NUMBER_DAILY_QUESTIONS, date, setQuestionDocIds);
                } else {
                    setQuestionDocIds(response.data.data[0].docIds.split(","));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function chooseSomeIds(getEndpoint, postEndpoint, numberDocIds, date, setter) {
        axios
            .get(getEndpoint)
            .then((response) => {
                const docIds = [];
                while (docIds.length < numberDocIds) {
                    const newId = response.data[Math.floor(Math.random() * response.data.length)];
                    if (!docIds.includes(newId)) {
                        docIds.push(newId);
                    }                  
                }
                pushDocIds(postEndpoint, date, docIds);
                setter(docIds);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function pushDocIds(endpoint, date, docIds) {
        axios
            .post(endpoint, {
                data : {
                    date : date,
                    docIds: docIds.join(",")
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    return (<>
        <title>{SENTENCES.TITLES.MAIN_TITLE}</title>
        <TitleBar nameP={t('titles.daily_title')}/>
        {(currentId < NUMBER_DAILY_QUESTIONS) && (
            <QuestionForm questionDocId={questionDocIds[currentId]}
            isCorrect={allCorrect}
            setIsCorrect={setAllCorrect} />
        )}
        {(currentId >= NUMBER_DAILY_QUESTIONS) && (
            <IdentityForm characterDocId={charDocIds[currentId-NUMBER_DAILY_QUESTIONS]}
            allCorrect={allCorrect}
            setAllCorrect={setAllCorrect}
            setIsNoob={setIsNoob} />
        )}
        {(allCorrect !== null) && (currentId < (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS)) && (<>
            <button onClick={() => {
                setCurrentId(currentId + 1);}
            }>
            {t('identity.new_character_button')}</button>
        </>)}
    </>);
}

export default DailyPage;