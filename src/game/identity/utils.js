import { BBY } from "./identityBox.js";

class Utils {
    static checkTextAnswer (field, answer, answerRef, setState) {
        const result = (field === answer);
        if (result) {
            setState(answerRef);
        }
        return result;
    }

    static checkYearAnswer (field, answer, era, setYearState, setEraState) {
        const result = ((era === BBY ? field*-1 : field) === answer);
        if (result) {
            setYearState(field);
            setEraState(era);
        }
        return result
    }

    static checkAllegiances (inputs, answers, setState) {
        const result = (inputs.length === answers.length) &&
            inputs.every((a) => answers.includes(a));

        if (result) {
            setState(answers);
        }

        return result;
    }
}

export default Utils;