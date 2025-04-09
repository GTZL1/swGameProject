import React, { useState } from "react";
import "./buttons.css"
import EngIcon from '../../resources/icons/eng-icon.png';
import FrIcon from '../../resources/icons/fr-icon.png';

const LanguageSwitch = () => {
    const [isClicked, setIsClicked] = useState(false);

  const handleLanguageChange = (e) => {
    setIsClicked(!isClicked)
  };

  return (<div id="flagList">
    <button onClick={handleLanguageChange}><img src={EngIcon}
    className="langFlag"
    alt="UK flag icon" />
    </button>
    {isClicked &&<>
    <button><img src={FrIcon} alt="France flag icon" className="langFlag"/></button>
    <button><img src={EngIcon} className="langFlag"/></button>
    </>}
    </div>
  );
};

export default LanguageSwitch;
