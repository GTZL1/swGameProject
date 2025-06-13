import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Utils from './utils.js';
import { NUMBER_DAILY_QUESTIONS, NUMBER_DAILY_CHARACTERS, RIGHT_ANSWER_CHAR, WRONG_ANSWER_CHAR } from '../../constants/constants.js';

const DailyNextBox = ({currentId, allCorrect, isNoob, characterScore, questionScore,
        setCurrentId, setQuestionScore, setCharacterScore, setAllCorrect, setIsNoob}) => {
    const { t } = useTranslation();
    const effectRan = useRef(false);
    
    const score = currentId >= NUMBER_DAILY_QUESTIONS ? characterScore : questionScore;
    const range = currentId >= NUMBER_DAILY_QUESTIONS ? NUMBER_DAILY_CHARACTERS : NUMBER_DAILY_QUESTIONS;
    const chars = Utils.onlyScore(score,range).split('');

    useEffect(() => {
        //prevent double execution in strict mode
        if (effectRan.current) {
            return;
        }
        effectRan.current = true;
        
        chars[score.length] = allCorrect ? RIGHT_ANSWER_CHAR : WRONG_ANSWER_CHAR;
        updateScore(currentId, allCorrect, isNoob);
    }, []);

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

    return (<>
        <p className='mt-2'>
            {chars.join('')}
        </p>
        <button className='mt-2'
            onClick={() => {
                setCurrentId(currentId + 1);
                setAllCorrect(null);
                setIsNoob(false);
            }}>
            {(currentId === (NUMBER_DAILY_QUESTIONS + NUMBER_DAILY_CHARACTERS -1))
                ? t('daily.see_score') : t('daily.next')}
        </button>
    </>);
}

export default DailyNextBox;