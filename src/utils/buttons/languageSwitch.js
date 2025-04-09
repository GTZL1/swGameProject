import React, { useState } from "react";
import "./buttons.css"
import EngIcon from '../../resources/icons/eng-icon.png';
import FrIcon from '../../resources/icons/fr-icon.png';

const LanguageSwitch = () => {
    const [isClicked, setIsClicked] = useState(true);

  const handleLanguageChange = (e) => {
    setIsClicked(!isClicked)
  };

  return (<div id="flagList"
    style={{transform : isClicked ? "translateY(26%)" : "translateY(0%)"}}>
        <button onClick={handleLanguageChange}><img src={EngIcon}
        className="langFlag"
        alt="UK flag icon" />
        </button>
        {isClicked &&<>
        <button><img src={FrIcon} alt="France flag icon" className="langFlag"/></button>
        
    </>}
    </div>
  );
  //<button><img src={EngIcon} className="langFlag"/></button>
};

export default LanguageSwitch;
