import TitleBar from '../../utils/title/title.js';
import { useTranslation } from 'react-i18next';
import QuestionBox from './questionBox.js';
import { useFont } from '../../context/FontContext.js';
import '../common.css';

const QuestionPage = () => {
    const { t } = useTranslation();
    const { contentFont } = useFont();

    return (<>
    <TitleBar nameP={t('titles.question_title')}/>
    <section className={`${contentFont} page game-button`}><QuestionBox /></section>
    </>);
}

export default QuestionPage;