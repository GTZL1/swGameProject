import React, { useState, useEffect } from 'react';
import './title.css';
import LanguageSwitch from '../buttons/languageSwitch.js';
import ButtonLink from '../buttons/buttonLink.js';
import { useFont } from '../../context/FontContext.js'; 
import FontSwitch from '../buttons/fontSwitch.js';
import { useTranslation } from "react-i18next";

const TitleBar = ({nameP}) => {
    const { t } = useTranslation();
    const { titleFont } = useFont();

    function TitleText({ name }) {
        return <h1 className={`${titleFont} text-3xl w-[75%] absolute left-1/2 transform -translate-x-1/2 m-0 text-center`}>
            {name.toLowerCase()}</h1>;
    }
        
    return (<>
        <title>{t('titles.main_title_lower')}</title>
        <header className='flex items-center justify-between sticky top-0 w-full h-20 overflow-visible bg-stone-300'>
            <ButtonLink route={'/'} children={<img className='max-h-full' src={'/resources/icons/home_icon.png'} id='home'/>}
                style="h-16" />
            <TitleText name={nameP} />
            <div id="flagList" className='flex flex-col h-full items-end'>
                <LanguageSwitch style="h-[60%] p-1" />
                <FontSwitch style="justify-end h-[40%]" />
            </div>
        </header>
    </>);
}

export default TitleBar;