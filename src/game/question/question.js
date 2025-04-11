class Question {
    #documentId;
    #questionTitle; 
    #answer;

    constructor(documentId, text, answer) {
        this.#documentId = documentId;
        this.#questionTitle = text;
        this.#answer = answer;
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

    checkAnswer(userInput) {
        return userInput.toLowerCase() === this.#answer.toLowerCase();
    }
}

export default Question;