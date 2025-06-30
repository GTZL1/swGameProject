import ICONS from "../../constants/icons.js";
import ButtonLink from "../buttons/buttonLink.js";
import './titleButtons.css';
import ENDPOINTS from "../../constants/endpoints.js";

const TitleButtons = ({setShowMenu}) => {
    return (<>
        <div className="grid grid-cols-2 mr-1">
            <ButtonLink route={'/'} style="title-button items-end home-button"
                children={<img src={`${ICONS.PATH}${ICONS.HOME}`} />} />
            <ButtonLink route={ENDPOINTS.KOFI_LINK} style="title-button"
                children = {<img src={`${ICONS.PATH}${ICONS.COFFEE}`} />} />
            <button className="title-button" onClick={setShowMenu}>
                <img src={`${ICONS.PATH}${ICONS.MENU}`} />
            </button>
            <ButtonLink route={ENDPOINTS.DISCORD_LINK} style="title-button"
                children = {<img src={`${ICONS.PATH}${ICONS.DISCORD}`} />} />
        </div>
    </>);
}

export default TitleButtons;