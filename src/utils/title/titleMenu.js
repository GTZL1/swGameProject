import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useFont } from "../../context/FontContext.js";
import ENDPOINTS from "../../constants/endpoints.js";

const TitleMenu = ({style}) => {
    const { t } = useTranslation();
    const { contentFont } = useFont();

    return (<nav className={`${style} ${contentFont} flex flex-col sm:flex-row sm:justify-around items-center shadow-md`}>
        <MenuText text={t('titles.about_title')} route={ENDPOINTS.ABOUT} />
        <MenuText text={t('titles.how_to_title')} route={ENDPOINTS.HOW_TO} />
        <MenuText text={t('titles.support_title')} route={ENDPOINTS.SUPPORT} />
        <MenuText text={t('titles.daily_title')} route={ENDPOINTS.DAILY_PAGE} />
    </nav>);
}

const MenuText = ({text, route}) => {
    return (<Link to={route}>
        <p className={`font-bold text-sm py-1`}>
            {text}
        </p>
    </Link>);
}

export default TitleMenu;