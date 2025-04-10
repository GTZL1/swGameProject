import Question from "./question.js";

class QuestionFetcher {
    static findQuestion() {
        return new Question(
            "Question" + Math.floor(Math.random() * 10), "bi");
    }
}

export default QuestionFetcher;