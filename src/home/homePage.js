import React, { useState, useEffect } from 'react';
import ENDPOINTS from '../constants/endpoints.js';
import SENTENCES from '../constants/sentences.js';
import ButtonLink from '../utils/buttons/buttonLink.js';
import TitleBar from '../utils/title/title.js';
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const {t} = useTranslation();

    return (<>
    <title>{SENTENCES.TITLES.MAIN_TITLE}</title>
    <TitleBar nameP={t('titles.main_title')} />
    <ButtonLink route = {ENDPOINTS.QUESTION_ENDPOINT}>{t('titles.question_button')}</ButtonLink>
    <ButtonLink route = {ENDPOINTS.IDENTITY_ENDPOINT}>{t('titles.identity_button')}</ButtonLink>
    </>)
}

export default HomePage