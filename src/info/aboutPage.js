import { useTranslation } from "react-i18next";
import { useFont } from "../context/FontContext.js";
import TitleBar from "../utils/title/title.js";
import ENDPOINTS from "../constants/endpoints.js";
import ICONS from "../constants/icons.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Utils from "./utils.js";
import CommonUtils from "../utils/commonUtils.js";
import { INFO_BACKGROUND_CLASS } from "../constants/constants.js";

const AboutPage = () => {
    const { i18n, t } = useTranslation();
    const {contentFont} = useFont();
    const [introMessage, setIntroMessage] = useState(null);
    const [discordMessage, setDiscordMessage] = useState(null);
    const [networkMessage, setNetworkMessage] = useState(null);

    useEffect(() => CommonUtils.setBackgroundClass(document, INFO_BACKGROUND_CLASS), []);

    useEffect(() => {
        axios
            .get(`${ENDPOINTS.ABOUT_TEXT_PATH}${t('intro.message')}`)
            .then(response => setIntroMessage(response.data));
        axios
            .get(`${ENDPOINTS.ABOUT_TEXT_PATH}${t('intro.discord')}`)
            .then(response => setDiscordMessage(response.data));
        axios
            .get(`${ENDPOINTS.ABOUT_TEXT_PATH}${t('intro.networks')}`)
            .then(response => setNetworkMessage(response.data));
    }, [i18n.language]);

    return (<>
        <TitleBar nameP={t('titles.about_title')} />
        <section className={`${contentFont} page flex-col items-center`}>
            <article className={`info-page flex flex-col-reverse sm:flex-row max-w-[80%] mx-10
                items-center sm:items-start`}>
                <div className="pr-3 sm:w-[80%]">
                    <p className='text-cyan-600 font-bold text-sm'>{t('intro.title')}</p>
                    <p>{introMessage}</p>
                    <Utils.IconsParagraph text={discordMessage}
                        icons={[ICONS.BLUE_DISCORD]} links={[ENDPOINTS.DISCORD_LINK]} />
                    <Utils.IconsParagraph text={networkMessage} icons={[ICONS.YOUTUBE, ICONS.INSTA]}
                        links={[ENDPOINTS.YT_LINK, ENDPOINTS.INSTA_LINK]} />
                </div>
                <img className="min-w-36 max-w-[25%] rounded-2xl object-contain"
                    src={`${ENDPOINTS.IMAGE_BACKEND_URL}${ENDPOINTS.ME_IMAGE}`} />
            </article>
        </section>
    </>);
}



export default AboutPage;