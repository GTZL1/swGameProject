import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFont } from "../context/FontContext.js";
import TitleBar from "../utils/title/title.js";
import CommonUtils from "../utils/commonUtils.js";
import { INFO_BACKGROUND_CLASS } from "../constants/constants.js";
import axios from 'axios';
import ENDPOINTS from "../constants/endpoints.js";
import ICONS from "../constants/icons.js";
import Utils from "./utils.js";

const SupportPage = () => {
    const { i18n,t } = useTranslation();
    const {contentFont} = useFont();
    const [shareMessage, setShareMessage] = useState(null);
    const [kofiMessage, setKofiMessage] = useState(null);
    
    useEffect(() => CommonUtils.setBackgroundClass(document, INFO_BACKGROUND_CLASS), []);

    useEffect(() => {
        axios
            .get(`${ENDPOINTS.SUPPORT_TEXT_PATH}${t('support.share')}`)
            .then(response => setShareMessage(response.data));
        axios
            .get(`${ENDPOINTS.SUPPORT_TEXT_PATH}${t('support.kofi')}`)
            .then(response => setKofiMessage(response.data));
    }, [i18n.language]);

    return (<>
        <TitleBar nameP={t('titles.support_title')} />
        <section className={`${contentFont} page flex-col items-center`}>
            <article className={`info-page max-w-[70%] mx-10 items-center`}>
                <p className='text-cyan-600 font-bold text-sm'>{t('support.title')}</p>
                <br/><p>{t('support.intro')}</p>
                <Utils.IconsParagraph text={shareMessage} icons={[ICONS.BLUE_DISCORD]}
                    links={[ENDPOINTS.DISCORD_LINK]} linebreak={true} />
                <Utils.IconsParagraph text={kofiMessage} icons={[ICONS.KOFI_LARGE]}
                    links={[ENDPOINTS.KOFI_LINK]} linebreak={true} />
            </article>
        </section>
    </>);
}

export default SupportPage;