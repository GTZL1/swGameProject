import ButtonLink from "../buttons/buttonLink.js";
import './titleButtons.css';

const TitleButtons = ({setShowMenu}) => {

    return (<>
        <div className="grid grid-cols-2 mr-1">
            <ButtonLink route={'/'} style="title-button items-end home-button"
                children={<img src={'/resources/icons/home_icon.png'} />} />
            <button className="title-button">
                <img src={'resources/icons/coffee.png'} />
            </button>
            <button className="title-button">
                <img src={'resources/icons/menu.png'} />
            </button>
            <button className="title-button">
                <img src={'resources/icons/discord.png'} />
            </button>
        </div>
    </>);
}

export default TitleButtons;