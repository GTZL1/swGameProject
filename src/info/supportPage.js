import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFont } from "../context/FontContext.js";
import TitleBar from "../utils/title/title.js";
import CommonUtils from "../utils/commonUtils.js";
import { INFO_BACKGROUND_CLASS } from "../constants/constants.js";

const SupportPage = () => {
    const {t} = useTranslation();
    const {contentFont} = useFont();
    
    useEffect(() => CommonUtils.setBackgroundClass(document, INFO_BACKGROUND_CLASS), []);

    return (<>
        <TitleBar nameP={t('titles.support_title')} />
        <section className={`${contentFont} page flex-col items-center`}>
            <p>This page is in works.</p>
        </section>
    </>);
}

export default SupportPage;