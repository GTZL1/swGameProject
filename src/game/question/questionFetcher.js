import Question from "./question.js";

class QuestionFetcher {
    static #nbQuestions = 11;


    static findQuestion() {
        const nb = Math.floor(Math.random() * 11);
        return new Question(nb.toString(),
            "Question" +nb, "bi");
    }

    static getNbQuestions() {
        return this.#nbQuestions;
    }
}

export default QuestionFetcher;