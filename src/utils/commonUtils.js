class CommonUtils {
    static setBackgroundClass(document, bgClass = "") {
        document.body.classList.add(bgClass);
        return () => {
            document.body.classList.remove(bgClass);
        };
    }
}

export default CommonUtils;