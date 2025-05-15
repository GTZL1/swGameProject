import { NO_ANSWER_CHAR } from '../../constants/constants.js';

class Utils {
    static onlyScore(scores, range) {
        return Array.from({ length : range }, (_, index) => {
            return index < scores.length ? scores[index] : NO_ANSWER_CHAR;
        }).join('');
    }

    static scoreText(scores, title, range) {
        return `${title} : ${this.onlyScore(scores, range)}`;
    }

    static updateFromCookie(cookie, idSetter, questionScoreSetter, characterScoreSetter) {
        idSetter(Number(cookie.split('; ').find(row => row.startsWith('currentId=')).split('=')[1]) + 1);

        const questionsDone = cookie.split('; ').find(row => row.startsWith('questionScore='));
        if(questionsDone) {
            questionScoreSetter(questionsDone.split('=')[1].split(','));
        }
        const characterDone = cookie.split('; ').find(row => row.startsWith('characterScore='));
        if (characterDone) {
            characterScoreSetter(characterDone.split('=')[1].split(','));
        }
    }
}

export default Utils;