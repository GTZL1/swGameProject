import { useTranslation } from "react-i18next";
import { useFont } from "../context/FontContext.js";
import TitleBar from "../utils/title/title.js";

const HowToPage = () => {
    const {t} = useTranslation();
    const {contentFont} = useFont();
    
    return (<>
        <TitleBar nameP={t('titles.how_to_title')} />
        <section className={`${contentFont} page flex-col items-center`}>
            <article>

            </article>
            <article>
                
            </article>
        </section>
    </>);
}

export default HowToPage;