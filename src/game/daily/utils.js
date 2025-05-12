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
}

export default Utils;