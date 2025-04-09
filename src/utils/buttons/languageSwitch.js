import React, { useState } from "react";
import "./buttons.css"
import EngIcon from '../../resources/icons/eng-icon.png';
import FrIcon from '../../resources/icons/fr-icon.png';

const LanguageSwitch = () => {
    const [isClicked, setIsClicked] = useState(false);

  const handleLanguageChange = (e) => {
    setIsClicked(!isClicked)
  };

  return (<>
    <button onClick={handleLanguageChange}><img src={EngIcon}
    className="langFlag"
    alt="UK flag icon" />
    </button>
    {isClicked &&<div id="flagList">
    <img src={FrIcon} alt="France flag icon" className="langFlag"/>
    <img src={EngIcon} className="langFlag"/>
    </div>}
    </>
  );
};

export default LanguageSwitch;
