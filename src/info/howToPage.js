import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFont } from "../context/FontContext.js";
import TitleBar from "../utils/title/title.js";
import axios from "axios";
import ENDPOINTS from "../constants/endpoints.js";
import { HOW_TO_IMAGE_DAILY, HOW_TO_IMAGE_IDENTITY, HOW_TO_IMAGE_QUESTIONS, SEPARATOR_IN_FILES } from "../constants/constants.js";
import ICONS from "../constants/icons.js";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { identity } from "lodash";
import Utils from "./utils.js";
import './backgrounds.css';

const HowToPage = () => {
    const {i18n, t} = useTranslation();
    const {contentFont} = useFont();
    const [questionHelp, setQuestionHelp] = useState(null);
    const [identityHelp, setIdentityHelp] = useState(null);
    const [dailyHelp, setDailyHelp] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(() => Utils.setBackgroundClass(document), []);

    useEffect(() => {
        axios
            .get(`${ENDPOINTS.HOW_TO_TEXT_PATH}${t('how_to.questions')}`)
            .then(response => setQuestionHelp(response.data));
        axios
            .get(`${ENDPOINTS.HOW_TO_TEXT_PATH}${t('how_to.identity')}`)
            .then(response => setIdentityHelp(response.data));
        axios
            .get(`${ENDPOINTS.HOW_TO_TEXT_PATH}${t('how_to.daily')}`)
            .then(response => setDailyHelp(response.data));
    }, [i18n.language]);
    
    return (<>
        <TitleBar nameP={t('titles.how_to_title')} />
        <section className={`${contentFont} page flex-col items-center`}>
            <article className='info-page w-[70%]'>
                <p>{t('how_to.intro')}</p>

                <HelpBlock title={t('titles.question_title')} images={HOW_TO_IMAGE_QUESTIONS}
                    text = {questionHelp}
                    setIsOpen={setIsOpen} setPhotoIndex={setPhotoIndex} />

                <HelpBlock title={t('titles.identity_title')} images={HOW_TO_IMAGE_IDENTITY}
                    text = {identityHelp} precedingLength={HOW_TO_IMAGE_QUESTIONS.length}
                    setIsOpen={setIsOpen} setPhotoIndex={setPhotoIndex} />

                <HelpBlock title={t('how_to.daily_title')} images={HOW_TO_IMAGE_DAILY}
                    text = {dailyHelp} precedingLength={HOW_TO_IMAGE_QUESTIONS.length + HOW_TO_IMAGE_IDENTITY.length}
                    setIsOpen={setIsOpen} setPhotoIndex={setPhotoIndex} />

                <Subtitle text={t('how_to.voilà')} />
                <Utils.IconsParagraph text={t('how_to.discord')} icons={[ICONS.BLUE_DISCORD]}
                links={[ENDPOINTS.DISCORD_LINK]} lineBreak={false}/>
                    <p className="mt-8">{t('how_to.real_fan')}</p>
            </article>
            <Lightbox open={isOpen}
                close={() => setIsOpen(false)}
                slides={[...HOW_TO_IMAGE_QUESTIONS, ...HOW_TO_IMAGE_IDENTITY, ...HOW_TO_IMAGE_DAILY].map((i) => {
                    return { src: `${ICONS.PATH}${i}`};
                })}
                index={photoIndex} />
        </section>
    </>);
}

const HelpBlock = ({title, text, images, precedingLength = 0, setIsOpen, setPhotoIndex}) => {
    return (<>
        <Subtitle text={title} />
        {text && <HelpParagraph text={text} />}
        <Images images={images} setIsOpen={setIsOpen}
            setPhotoIndex={setPhotoIndex}
            precedingLength={precedingLength} />
    </>);    
}

const Subtitle = ({text}) => {
    return <p className='text-cyan-600 font-bold text-lg text-center mt-5'>{text}</p>
}

const Images = ({images, setIsOpen, setPhotoIndex, precedingLength = 0}) => {
    return (<div className="flex flex-col md:flex-row gap-2 md:justify-center items-center mt-2">
        {images.map((img, idx) => <img className="min-w-36 md:max-w-[40%] max-w-[80%]"
            key={idx} src={`${ICONS.PATH}${img}`}
            onClick={() => {
                    setIsOpen(true);
                    setPhotoIndex(idx + precedingLength);
                }
            }/>
        )}
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