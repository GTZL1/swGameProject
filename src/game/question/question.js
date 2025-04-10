class Question {
    #text; 
    #answer;

    constructor(text, answer) {
        this.#text = text;
        this.#answer = answer;
    }

    getText() {
        return this.#text;
    }

    getAnswer() {
        return this.#answer;
    }

    checkAnswer(userInput) {
        return userInput.toLowerCase() === this.#answer.toLowerCase();
    }
}

export default Question;