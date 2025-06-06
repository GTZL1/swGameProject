import { useTranslation } from "react-i18next";
import { useFont } from "../context/FontContext.js";
import TitleBar from "../utils/title/title.js";
import ENDPOINTS from "../constants/endpoints.js";
import ICONS from "../constants/icons.js";

const AboutPage = () => {
    const {t} = useTranslation();
    const {contentFont} = useFont();
    
    return (<>
        <TitleBar nameP={t('titles.about_title')} />
        <section className={`${contentFont} page flex-col items-center`}>
            <article className={`question-div flex flex-col-reverse sm:flex-row max-w-[80%] mx-10 p-3
                text-justify text-[13px] items-center sm:items-start`}>
                <div className="pr-3 sm:w-[80%]">
                    <p className='text-cyan-600 font-bold text-sm'>{t('intro.title')}</p>
                    <p>{t('intro.message')}</p>
                    <p>{t('intro.message')}</p>
                    <IconsParagraph text={'To discuss anything game-related, the Discord server is here.'}
                        icons={[ICONS.BLUE_DISCORD]} links={['']} />
                    <IconsParagraph text={'You can reach me on my social media. '} icons={[ICONS.YOUTUBE, ICONS.INSTA]}
                        links={[ENDPOINTS.YT_LINK, ENDPOINTS.INSTA_LINK]} />
                </div>
                <img className="min-w-36 max-w-[25%] rounded-2xl object-contain"
                    src={`${ENDPOINTS.IMAGE_BACKEND_URL}${ENDPOINTS.ME_IMAGE}`} />
            </article>
        </section>
    </>);
}

const IconsParagraph = ({text, icons, links}) => {
    return(<div>
        <br/>
        <p>{text}{text}</p>
        <div className="flex justify-center gap-4">
            {icons.map((icon, idx) => <a href={links[idx]}>
                    <img src={`${ICONS.PATH}${icon}`} className="h-10 object-contain" /></a>)}
        </div>
    </div>);
}

export default AboutPage;