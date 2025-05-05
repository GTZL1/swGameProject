import React, { useState, useEffect } from 'react';
import ENDPOINTS from '../constants/endpoints.js';
import SENTENCES from '../constants/sentences.js';
import ButtonLink from '../utils/buttons/buttonLink.js';
import TitleBar from '../utils/title/title.js';
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const {t} = useTranslation();
    const buttonColorClass = "text-red-600";
    return (<>
    <title>{SENTENCES.TITLES.MAIN_TITLE}</title>
    <TitleBar nameP={t('titles.main_title')} />
    <ButtonLink route = {ENDPOINTS.QUESTION_PAGE} style={buttonColorClass}>{t('titles.question_button')}</ButtonLink>
    <ButtonLink route = {ENDPOINTS.IDENTITY_PAGE} style={buttonColorClass}>{t('titles.identity_button')}</ButtonLink>
    
    <div><p>4 questions and 2 characters random every day, the same for everyone !</p>
    <ButtonLink route = {ENDPOINTS.DAILY_PAGE} style={buttonColorClass}>{t('titles.daily_title')}</ButtonLink></div>
    </>)
}

export default HomePage