import React, { useState, useEffect } from 'react';
import ENDPOINTS from '../constants/endpoints.js';
import TitleBar from '../utils/title/title.js';
import { useTranslation } from "react-i18next";
import GameModeBox from './gameModeBox.js';
import { useFont } from '../context/FontContext.js';
import '../game/common.css';
import CommonUtils from '../utils/commonUtils.js';
import { HOME_BACKGROUND_CLASS } from '../constants/constants.js';

const HomePage = () => {
    const {t} = useTranslation();
    const {contentFont} = useFont();

    useEffect(() => CommonUtils.setBackgroundClass(document, HOME_BACKGROUND_CLASS), []);
    
    return (<>
        <TitleBar nameP={t('titles.main_title')} />
        <section className={`${contentFont} page flex-col items-center`}>
            <div className='flex flex-wrap justify-center'>
                <GameModeBox endpoints = {[ENDPOINTS.DAILY_PAGE]}
                    title = {t('titles.daily_title')}
                    text={t('titles.daily_intro')}
                    buttonTexts={[t('titles.daily_button')]} />
                <GameModeBox endpoints = {[ENDPOINTS.QUESTION_PAGE, ENDPOINTS.IDENTITY_PAGE]}
                    title = {t('titles.freeplay_title')}
                    text={t('titles.freeplay_intro')}
                    buttonTexts={[t('titles.question_button'), t('titles.identity_button')]} />
            </div>
        </section>
    </>)
}

export default HomePage