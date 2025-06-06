import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import ENDPOINTS from "../../constants/endpoints.js";

const TitleMenu = ({style}) => {
    const { t } = useTranslation();

    return (<nav className={`${style} flex flex-col sm:flex-row sm:justify-around items-center`}>
        <MenuText text={t('titles.about_title')} />
        <MenuText text={t('titles.how_to_title')} />
        <MenuText text={t('titles.support_title')} />
        <MenuText text={t('titles.daily_title')} route={ENDPOINTS.DAILY_PAGE} />
    </nav>);
}

const MenuText = ({text, route}) => {
    return (<Link to={route}>
        <p className="font-bold text-sm py-1">
            {text}
        </p>
    </Link>);
}

export default TitleMenu;