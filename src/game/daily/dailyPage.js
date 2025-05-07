import React, { useState, useEffect, useRef } from 'react';
import TitleBar from '../../utils/title/title.js';
import { useTranslation } from 'react-i18next';
import SENTENCES from '../../constants/sentences.js';
import axios from 'axios';
import ENDPOINTS from '../../constants/endpoints.js';
import IdentityForm from '../identity/identityForm.js';
import QuestionForm from '../question/questionForm.js';
import { useFont } from '../../context/FontContext.js';
import '../common.css';

export const NUMBER_DAILY_QUESTIONS = 4;
export const NUMBER_DAILY_CHARACTERS = 2;

const DailyPage = () => {
    const { t } = useTranslation();
    const { contentFont } = useFont();

    const [questionDocIds, setQuestionDocIds] = useState([]);
    const [charDocIds, setCharDocIds] = useState([]);
    const effectRan = useRef(false);
    const [currentId, setCurrentId] = useState(0);
    const [allCorrect, setAllCorrect] = useState(false);
    const [isNoob, setIsNoob] = useState(false);

    const [questionScore, setQuestionScore] = useState([]);
    const [characterScore, setCharacterScore] = useState([]);

    const rightAnswerChar = 'V';
    const wrongAnswerChar = 'X';
    const noAnswerChar = '.';
    
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
                            NUMBER_DAILY_CHARACTERS, date, setCharDocIds, response.data.data[0].documentId);
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
                        NUMBER_DAILY_QUESTIONS, date, setQuestionDocIds, response.data.data[0].documentId);
                } else {
                    setQuestionDocIds(response.data.data[0].docIds.split(","));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function chooseSomeIds(getEndpoint, postEndpoint, numberDocIds, date, setter, oldDocId) {
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
                pushDocIds(postEndpoint, date, docIds, oldDocId);
                setter(docIds);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function pushDocIds(endpoint, date, docIds, oldDocId) {
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
        axios
            .delete(`${endpoint}/${oldDocId}`)
            .catch((error) => {
                console.log(error);
            });
    }

    function updateScore(currentId, isCorrect, isNoob) {
        if (currentId < NUMBER_DAILY_QUESTIONS) {
            setQuestionScore([...questionScore, (isCorrect ? rightAnswerChar : wrongAnswerChar)]);
        } else {
            setCharacterScore([...characterScore, (isNoob ? wrongAnswerChar : rightAnswerChar)]);
        }
    }

    function scoreText(scores, title, range) {
        return `${title} : [` + 
        `${Array.from({ length : range }, (_, index) => {
            return index < scores.length ? scores[index] : noAnswerChar;
        }).join('')}]`;
    }
    
    function Score({scores, title, range}) {
        return <div>
            <p>{title} : &#91;
                {
                    Array.from({ length : range }, (_, index) => {
                        return index < scores.length ? scores[index] : noAnswerChar;
                    }).join('')
                }
                &#93;
            </p>
        </div>
    }

    function displayNextButton() {
        if (currentId >= NUMBER_DAILY_QUESTIONS) {
            return (allCorrect || isNoob);
        }
        return (allCorrect !== null);
    }

    return (<>
        <title>{SENTENCES.TITLES.MAIN_TITLE}</title>
        <TitleBar nameP={t('titles.daily_title')}/>

        <section className={`${contentFont} flex justify-center mt-5 game-button`}>

            {(currentId < NUMBER_DAILY_QUESTIONS) && (
                <QuestionForm questionDocId={questionDocIds[currentId]}
                    isCorrect={allCorrect}
                    setIsCorrect={setAllCorrect} />
            )}
            {(currentId >= NUMBER_DAILY_QUESTIONS && currentId < (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS)) && (
                <IdentityForm characterDocId={charDocIds[currentId-NUMBER_DAILY_QUESTIONS]}
                    allCorrect={allCorrect}
                    setAllCorrect={setAllCorrect}
                    setIsNoob={setIsNoob} />
            )}

            {(currentId >= (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS)) && (<>
                <Score scores = {questionScore}
                    title = {t('titles.question_title')}
                    range = {NUMBER_DAILY_QUESTIONS} />
                <Score scores = {characterScore}
                    title = {t('titles.identity_title')}
                    range = {NUMBER_DAILY_CHARACTERS} />
                <button onClick={() => {
                    navigator.clipboard.writeText(
                        scoreText(questionScore, t('titles.question_title'), NUMBER_DAILY_QUESTIONS) + "\n"
                        + scoreText(characterScore, t('titles.identity_title'), NUMBER_DAILY_CHARACTERS));
                }}>
                    {t('daily.copy_score')}
                </button>
                </>
            )} 
       
            {displayNextButton() && (currentId < (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS)) && (<>
                <button onClick={() => {
                    updateScore(currentId, allCorrect, isNoob);
                    setCurrentId(currentId + 1);}
                }>
                    {(currentId === (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS -1))
                        ? t('daily.see_score') : t('daily.next')}
                </button>
            </>)}
        </section>
    </>);
}

export default DailyPage;