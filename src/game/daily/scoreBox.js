import { useTranslation } from "react-i18next";
import Utils from './utils.js';
import { NUMBER_DAILY_QUESTIONS, NUMBER_DAILY_CHARACTERS, RIGHT_ANSWER_CHAR } from '../../constants/constants.js';
import '../common.css';

const ScoreBox = ( {questionScore, characterScore} ) => {
    const { t } = useTranslation();

    function ScoreMessage({score, range, title, noobMessage, goodMessage, perfectMessage}) {
        const correctAnswers = score.filter((answerChar) => answerChar === RIGHT_ANSWER_CHAR).length;
        return <>
            <p className='text-blue-600 text-lg font-semibold italic'>
            {title} :<span className='not-italic'>  {Utils.onlyScore(score, range)}</span>
            </p>
            <p className='pb-3 text-sm'>
                {(correctAnswers < (range / 2) ? noobMessage :
                    (correctAnswers === score.length ? perfectMessage : goodMessage))}
            </p>
        </>
    }

    return <div className='flex flex-col items-center question-div p-3'>
        <ScoreMessage score={questionScore} range={NUMBER_DAILY_QUESTIONS}
            title={t('titles.question_title')}
            noobMessage={t('daily.score_noob_questions')}
            goodMessage={t('daily.score_good_questions')}
            perfectMessage={t('daily.score_perfect_questions')} />

        <ScoreMessage score={characterScore} range={NUMBER_DAILY_CHARACTERS}
            title={t('titles.identity_title')}
            noobMessage={t('daily.score_noob_identity')}
            goodMessage={t('daily.score_good_identity')}
            perfectMessage={t('daily.score_perfect_identity')} />

        <button onClick={() => {
            navigator.clipboard.writeText(
                t('titles.main_title_lower') + " – " +
                new Date().toLocaleDateString(t('titles.date_format'), { year: 'numeric', month: 'long', day: 'numeric' }) + "\n" 
                + Utils.scoreText(questionScore, t('titles.question_title'), NUMBER_DAILY_QUESTIONS) + "\n"
                + Utils.scoreText(characterScore, t('titles.identity_title'), NUMBER_DAILY_CHARACTERS) + "\n"
                + "🔗 http://asimplestarwarsgame.net");
        }}>
            {t('daily.copy_score')}
        </button>
    </div>
}

export default ScoreBox;