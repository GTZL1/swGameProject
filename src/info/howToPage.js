import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFont } from "../context/FontContext.js";
import TitleBar from "../utils/title/title.js";
import axios from "axios";
import ENDPOINTS from "../constants/endpoints.js";
import { HOW_TO_IMAGE_QUESTIONS, SEPARATOR_IN_FILES } from "../constants/constants.js";
import ICONS from "../constants/icons.js";

const HowToPage = () => {
    const {i18n, t} = useTranslation();
    const {contentFont} = useFont();
    const [questionHelp, setQuestionHelp] = useState(null);

    useEffect(() => {
        axios
            .get(`${ENDPOINTS.HOW_TO_TEXT_PATH}${t('how_to.questions')}`)
            .then(response => setQuestionHelp(response.data));
    }, [i18n.language]);
    
    return (<>
        <TitleBar nameP={t('titles.how_to_title')} />
        <section className={`${contentFont} page flex-col items-center `}>
            <article className='info-page w-[70%]'>
                <p>{t('how_to.intro')}</p>
                <Subtitle text={t('titles.question_title')} />
                {questionHelp && <HelpParagraph text={questionHelp} />}
                <Images images={HOW_TO_IMAGE_QUESTIONS} />
            </article>
        </section>
    </>);
}

const Subtitle = ({text}) => {
    return <p className='text-cyan-600 font-bold text-lg text-center mt-5'>{text}</p>
}

const Images = ({images}) => {
    return (<div className="flex flex-col md:flex-row gap-2 md:justify-center items-center mt-2">
        {images.map((img, idx) => <img className="min-w-36 md:max-w-[40%] max-w-[80%]"
            key={idx} src={`${ICONS.PATH}${img}`} />)}
    </div>);
}

const HelpParagraph = ({text}) => {
    const lines = text.split(SEPARATOR_IN_FILES);
    return (<div>
        {lines[0]}
        <ul className='list-disc pl-3'>
            {lines.slice(1).map((l, idx) => <li key={idx}>{l}</li>)}
        </ul>
    </div>);
}

export default HowToPage;