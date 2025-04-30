import React, { useState, useEffect } from 'react';
import './title.css';
import LanguageSwitch from '../buttons/languageSwitch.js';
import ButtonLink from '../buttons/buttonLink.js';

const TitleBar = ({nameP}) => {
    function TitleText({ name }) {
        return <h1>{name}</h1>;
    }
        
    return (<header>
        <ButtonLink route={'/'} children={<img src={'/resources/icons/home_icon.png'} id='home' />} />
        <TitleText name={nameP} />
        <LanguageSwitch />
        </header>);
}

export default TitleBar;