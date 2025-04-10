import React from "react";
import { useTranslation } from "react-i18next";

const QuestionBox = () => {
    const { i18n,t } = useTranslation();

    function Question() {
        return <div>Q: question</div>
    }

    function Answer() {
        return <input name="answerInput"/>
    }

    return(<>
        <Question />
        <Answer />
    </>);
}

export default QuestionBox;