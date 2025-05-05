import React, { useState, useEffect } from 'react';
import ENDPOINTS from '../constants/endpoints.js';
import SENTENCES from '../constants/sentences.js';
import ButtonLink from '../utils/buttons/buttonLink.js';
import TitleBar from '../utils/title/title.js';
import { useTranslation } from "react-i18next";
import GameModeBox from './gameModeBox.js';

const HomePage = () => {
    const {t} = useTranslation();
    
    return (<>
    <title>{SENTENCES.TITLES.MAIN_TITLE}</title>
    <TitleBar nameP={t('titles.main_title')} />
    <section className='flex flex-wrap justify-center'>
        <GameModeBox endpoint = {ENDPOINTS.QUESTION_PAGE} boxText = "hello hellllhf hffefihre fhqoirefirofhe hfeirehf" buttonText={t('titles.question_button')} />
        <GameModeBox endpoint = {ENDPOINTS.IDENTITY_PAGE} boxText = "hello hrfireof hirfhre hfoirehf hfhrefhf" buttonText={t('titles.identity_button')} />
        <GameModeBox endpoint = {ENDPOINTS.DAILY_PAGE} boxText = "4 questions and 2 characters random every day, the same for everyone !"
            buttonText={t('titles.daily_title')} />
    </section>
    </>)
}

export default HomePage