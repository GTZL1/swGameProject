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
    return (<div id="flagList" key={isClicked}
        style={{transform : isClicked ? "translateY(26%)" : "translateY(0%)"}}>
            <button onClick={() => handleLanguageChange(i18n.language)}>
                <img src={'/resources/icons/' + ICONS[i18n.language]}
                 className="langFlag" alt="Current language icon" />
            </button>
            {isClicked && 
            <button onClick={() => handleLanguageChange(otherLanguage)}>
                <img src={'/resources/icons/' + ICONS[otherLanguage]} alt="Other language icon" className="langFlag"/></button>
        }
        </div>
    );
};

export default LanguageSwitch;