import React, { useState, useEffect } from 'react';
import ENDPOINTS from '../constants/endpoints.js';
import TitleBar from '../utils/title/title.js';
import { useTranslation } from "react-i18next";
import GameModeBox from './gameModeBox.js';
import { useFont } from '../context/FontContext.js'; 

const HomePage = () => {
    const {t} = useTranslation();
    const {contentFont} = useFont();
    
    return (<>
        <title>{t('titles.main_title')}</title>
        <TitleBar nameP={t('titles.main_title')} />
        <section className={`${contentFont} flex flex-wrap justify-center`}>
            <GameModeBox endpoint = {ENDPOINTS.QUESTION_PAGE} boxText = {t('titles.question_intro')} buttonText={t('titles.question_button')} />
            <GameModeBox endpoint = {ENDPOINTS.IDENTITY_PAGE} boxText = {t('titles.identity_intro')} buttonText={t('titles.identity_button')} />
            <GameModeBox endpoint = {ENDPOINTS.DAILY_PAGE} boxText = {t('titles.daily_intro')} buttonText={t('titles.daily_title')} />
        </section>
    </>)
}

export default HomePage