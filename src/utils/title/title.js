import React, { useState, useEffect } from 'react';
import './title.css';
import LanguageSwitch from '../buttons/languageSwitch.js';

const TitleBar = ({nameP}) => {
    function TitleText({ name }) {
        return <h1>{name}</h1>;
    }
        
      return (<header>
        <TitleText name={nameP} />
        <LanguageSwitch />
        </header>);
}

export default TitleBar;