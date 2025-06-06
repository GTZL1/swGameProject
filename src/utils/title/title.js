import React, { useState, useEffect } from 'react';
import './title.css';
import LanguageSwitch from '../buttons/languageSwitch.js';
import ButtonLink from '../buttons/buttonLink.js';
import { useFont } from '../../context/FontContext.js'; 
import FontSwitch from '../buttons/fontSwitch.js';
import { useTranslation } from "react-i18next";
import TitleButtons from './titleButtons.js';

const TitleBar = ({nameP}) => {
    const { t } = useTranslation();
    const { titleFont } = useFont();

    function TitleText({ name }) {
        return <h1 className={`${titleFont} text-3xl w-[75%] absolute left-1/2 transform -translate-x-1/2 m-0 text-center`}>
            {name.toLowerCase()}</h1>;
    }
        
    return (<>
        <title>{t('titles.main_title_lower')}</title>
        <header className='sticky top-0'>
            <div className='flex items-center justify-between top-0 w-full h-24 sm:h-20 overflow-visible bg-stone-300'>
                <TitleButtons />
                <TitleText name={nameP} />
                <div id="flagList" className='flex flex-col h-full items-end justify-between'>
                    <LanguageSwitch style="h-[60%] max-h-12 p-1" />
                    <FontSwitch style="justify-end h-[40%]" />
                </div>
            </div>
            
        </header>
    </>);
}
//<div className='w-full h-12 bg-red-700'></div>
export default TitleBar;