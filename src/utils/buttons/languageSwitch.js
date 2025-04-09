import React, { useState } from "react";
import "./buttons.css"
import EngIcon from '../../resources/icons/eng-icon.png';
import FrIcon from '../../resources/icons/fr-icon.png';

const LanguageSwitch = () => {
    const [isClicked, setIsClicked] = useState(true);
    const en = 'en', fr = 'fr';

  const handleLanguageChange = (e) => {
    console.log(e);
    setIsClicked(!isClicked)
  };

  return (<div id="flagList"
    style={{transform : isClicked ? "translateY(26%)" : "translateY(0%)"}}>
        <button onClick={() => handleLanguageChange(en)}>
            <img src={EngIcon} className="langFlag" alt="UK flag icon" />
        </button>
        {isClicked &&<>
        <button onClick={() => handleLanguageChange(fr)}>
            <img src={FrIcon} alt="France flag icon" className="langFlag"/></button>
    </>}
    </div>
  );
};

export default LanguageSwitch;
