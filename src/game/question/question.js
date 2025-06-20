import { WORDS_TO_REMOVE } from "../../constants/constants.js";

class Question {
    #documentId;
    #questionTitle; 
    #answer;
    #answerIndication;
    #imageUrl;

    constructor(documentId, text, answer, answerIndication, imageUrl) {
        this.#documentId = documentId;
        this.#questionTitle = text;
        this.#answer = answer;
        this.#answerIndication = answerIndication;
        this.#imageUrl = imageUrl;
    }

    getDocumentId() {
        return this.#documentId;
    }

    getQuestionTitle() {
        return this.#questionTitle;
    }

    getAnswer() {
        return this.#answer;
    }

    getAnswerIndication() {
        return this.#answerIndication;
    }

    getImageUrl() {
        return this.#imageUrl;
    }

    checkAnswer(userInput) {
        return userInput.toLowerCase().split(' ').filter(word => !WORDS_TO_REMOVE.includes(word)).join(' ').trimEnd()
            === this.#answer.toLowerCase();
    }
}

export default Question;