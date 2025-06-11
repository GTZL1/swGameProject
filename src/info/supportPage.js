import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFont } from "../context/FontContext.js";
import TitleBar from "../utils/title/title.js";
import Utils from "./utils.js";

const SupportPage = () => {
    const {t} = useTranslation();
    const {contentFont} = useFont();
    
    useEffect(() => Utils.setBackgroundClass(document), []);

    return (<>
        <TitleBar nameP={t('titles.support_title')} />
        <section className={`${contentFont} page flex-col items-center`}>
            <p>This page is in works.</p>
        </section>
    </>);
}

export default SupportPage;