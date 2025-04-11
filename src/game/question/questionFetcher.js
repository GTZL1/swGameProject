import React, { useState } from "react";
import Question from "./question.js";
import { data } from "react-router";

class QuestionFetcher {
    static #docIds = [];
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