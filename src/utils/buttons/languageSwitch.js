import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ALL_LANGUAGES } from "../../i18n.js";
import ICONS from "../../constants/icons.js";

const LanguageSwitch = ( {style} ) => {
    const { i18n } = useTranslation();
    const [isClicked, setIsClicked] = useState(false);
    
    const handleLanguageChange = (newLang) => {
        setIsClicked((prevState) => !prevState);
        i18n.changeLanguage(newLang);
    };

    const otherLanguage = ALL_LANGUAGES.filter((lang) => lang != i18n.language);
    return (<button className= {`${style}`} id="flagList" key={isClicked} onClick={() => handleLanguageChange(otherLanguage)}>
            <img className="langFlag max-h-full" src={'/resources/icons/' + ICONS[otherLanguage]} alt="Other language icon"/>
            </button>
    );
};

export default LanguageSwitch;