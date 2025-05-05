import React, { useState, useEffect } from 'react';
import './title.css';
import LanguageSwitch from '../buttons/languageSwitch.js';
import ButtonLink from '../buttons/buttonLink.js';

const TitleBar = ({nameP}) => {
    function TitleText({ name }) {
        return <h1 className="whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 m-0">{name}</h1>;
    }
        
    return (<header className='items-center flex sticky top-0 w-full h-[60px] overflow-visible bg-stone-300'>
            <ButtonLink route={'/'} children={<img className='max-h-full' src={'/resources/icons/home_icon.png'} id='home' />} />
            <TitleText name={nameP} />
            <LanguageSwitch />
        </header>);
}

export default TitleBar;