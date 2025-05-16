import React, { useState, useEffect, useRef } from 'react';
import TitleBar from '../../utils/title/title.js';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ENDPOINTS from '../../constants/endpoints.js';
import { NUMBER_DAILY_QUESTIONS, NUMBER_DAILY_CHARACTERS, RIGHT_ANSWER_CHAR, WRONG_ANSWER_CHAR }
    from '../../constants/constants.js';
import IdentityForm from '../identity/identityForm.js';
import QuestionForm from '../question/questionForm.js';
import { useFont } from '../../context/FontContext.js';
import Utils from './utils.js';
import '../common.css';
import ScoreBox from './scoreBox.js';

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
    
    useEffect(() => {
        if (effectRan.current) {
            return;
        }
        effectRan.current = true;

        if (document.cookie.split('; ').find(row => row.startsWith('hasVisited='))) {
            Utils.updateFromCookie(document.cookie, setCurrentId, setQuestionScore, setCharacterScore);
        } else {
            document.cookie = `hasVisited=true; path=/; max-age=${Utils.cookieLife()}; samesite=lax`;
        }

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
        document.cookie = `currentId=${currentId}; path=/; max-age=${Utils.cookieLife()}; samesite=lax`;
        if (currentId < NUMBER_DAILY_QUESTIONS) {
            const newQuestionScore = [...questionScore, (isCorrect ? RIGHT_ANSWER_CHAR : WRONG_ANSWER_CHAR)];
            setQuestionScore(newQuestionScore);
            document.cookie = `questionScore=${newQuestionScore}; path=/; max-age=${Utils.cookieLife()}; samesite=lax`;
        } else {
            const newCharacterScore = [...characterScore, (isNoob ? WRONG_ANSWER_CHAR : RIGHT_ANSWER_CHAR)];
            setCharacterScore(newCharacterScore);
            document.cookie = `characterScore=${newCharacterScore}; path=/; max-age=${Utils.cookieLife()}; samesite=lax`;
        }
    }

    function displayNextButton() {
        if (currentId >= NUMBER_DAILY_QUESTIONS) {
            return (allCorrect || isNoob);
        }
        return (allCorrect !== null);
    }

    function AnswerProps() {
        const score = currentId >= NUMBER_DAILY_QUESTIONS ? characterScore : questionScore;
        const range = currentId >= NUMBER_DAILY_QUESTIONS ? NUMBER_DAILY_CHARACTERS : NUMBER_DAILY_QUESTIONS;
        const chars = Utils.onlyScore(score,range).split('');
        chars[score.length] = allCorrect ? RIGHT_ANSWER_CHAR : WRONG_ANSWER_CHAR;
        return (<>
            <p className='mt-2'>{chars.join('')}</p>
            <button className='mt-2'
                onClick={() => {
                    updateScore(currentId, allCorrect, isNoob);
                    setCurrentId(currentId + 1);
                }}>
                    {(currentId === (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS -1))
                        ? t('daily.see_score') : t('daily.next')}
            </button>
        </>);
    }

    return (<>
        <title>{t('titles.main_title')}</title>
        <TitleBar nameP={t('titles.daily_title')}/>
        <section className={`${contentFont} page game-button`}>
            {(currentId < NUMBER_DAILY_QUESTIONS) && (
                <QuestionForm questionDocId={questionDocIds[currentId]}
                    isCorrect={allCorrect}
                    setIsCorrect={setAllCorrect}
                    answerProps={displayNextButton() && (currentId < (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS)) &&
                        AnswerProps()} />
            )}
            {(currentId >= NUMBER_DAILY_QUESTIONS && currentId < (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS)) && (
                <IdentityForm characterDocId={charDocIds[currentId-NUMBER_DAILY_QUESTIONS]}
                    allCorrect={allCorrect}
                    setAllCorrect={setAllCorrect}
                    setIsNoob={setIsNoob}
                    answerProps={displayNextButton() && (currentId < (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS)) &&
                        AnswerProps()} />
            )}
            {(currentId >= (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS)) && (<>
                <ScoreBox questionScore={questionScore} characterScore={characterScore} />
            </>)}
        </section>
    </>);
}

export default DailyPage;