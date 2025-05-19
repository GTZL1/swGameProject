import React, { useState, useEffect } from 'react';
import ENDPOINTS from '../constants/endpoints.js';
import TitleBar from '../utils/title/title.js';
import { useTranslation } from "react-i18next";
import GameModeBox from './gameModeBox.js';
import { useFont } from '../context/FontContext.js';
import '../game/common.css';

const HomePage = () => {
    const {t} = useTranslation();
    const {contentFont} = useFont();
    
    return (<>
        <title>{t('titles.main_title_lower')}</title>
        <TitleBar nameP={t('titles.main_title')} />
        <section className={`${contentFont} page flex-col items-center`}>
            <div className='question-div max-w-[32rem] mx-10 px-3 py-2 text-justify text-[13px]'>
                <p className='text-cyan-600 font-bold text-sm'>{t('intro.title')}</p>
                <p>{t('intro.message')}</p>
            </div>
            <div className='flex flex-wrap justify-center'>
                <GameModeBox endpoint = {ENDPOINTS.QUESTION_PAGE} boxText = {t('titles.question_intro')} buttonText={t('titles.question_button')} />
                <GameModeBox endpoint = {ENDPOINTS.IDENTITY_PAGE} boxText = {t('titles.identity_intro')} buttonText={t('titles.identity_button')} />
                <GameModeBox endpoint = {ENDPOINTS.DAILY_PAGE} boxText = {t('titles.daily_intro')} buttonText={t('titles.daily_title')} />
            </div>
        </section>
    </>)
}

export default HomePage