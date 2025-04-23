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

    static translateAllegiances (allegiances, i18n, t) {
        if (i18n.language !== "en") {
            return allegiances.map((a) => 
                t(`identity.allegiances_${i18n.language}.`
                    + `${a.replaceAll(" ", "_").toLowerCase()}`));
        }
        return allegiances;
    }
}

export default Utils;