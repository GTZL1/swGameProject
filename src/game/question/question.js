class Question {
    constructor(text, answer) {
        this.text = text;
        this.answer = answer;
    }

    getText() {
        return this.text;
    }

    checkAnswer(userInput) {
        return userInput.toLowerCase() === this.answer.toLowerCase();
    }
}

export default Question;