class Question {
    #documentId;
    #questionTitle; 
    #answer;
    #imageUrl;

    constructor(documentId, text, answer, image) {
        this.#documentId = documentId;
        this.#questionTitle = text;
        this.#answer = answer;
        this.#imageUrl = (image === null ? "" : image.url)
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

    getImageUrl() {
        return this.#imageUrl;
    }

    checkAnswer(userInput) {
        return userInput.toLowerCase() === this.#answer.toLowerCase();
    }
}

export default Question;