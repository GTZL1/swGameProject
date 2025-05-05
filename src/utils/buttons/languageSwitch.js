import React, { useState } from "react";
import "./buttons.css"
import { useTranslation } from "react-i18next";
import { ALL_LANGUAGES } from "../../i18n.js";
import ICONS from "../../constants/icons.js";

const LanguageSwitch = () => {
    const { i18n } = useTranslation();
    const [isClicked, setIsClicked] = useState(false);
    
    const handleLanguageChange = (newLang) => {
        setIsClicked((prevState) => !prevState);
        i18n.changeLanguage(newLang);
    };

    const otherLanguage = ALL_LANGUAGES.filter((lang) => lang != i18n.language);
    return (<div id="flagList" key={isClicked}>
            <button onClick={() => handleLanguageChange(otherLanguage)}>
            <img src={'/resources/icons/' + ICONS[otherLanguage]} alt="Other language icon" className="langFlag"/></button>
        </div>
    );
};

export default LanguageSwitch;