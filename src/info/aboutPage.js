import { useTranslation } from "react-i18next";
import { useFont } from "../context/FontContext.js";
import TitleBar from "../utils/title/title.js";

const AboutPage = () => {
    const {t} = useTranslation();
    const {contentFont} = useFont();
    
    return (<>
        <TitleBar nameP={t('titles.about_title')} />
        <section className={`${contentFont} page flex-col items-center`}>
            
        </section>
    </>)
}

export default AboutPage;