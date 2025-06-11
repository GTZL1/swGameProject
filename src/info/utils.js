import ICONS from '../constants/icons.js';

class Utils {
    static IconsParagraph = ({text, icons, links, lineBreak = true}) => {
        return(<div>
            {lineBreak && <br/>}
            <p>{text}</p>
            <div className="flex justify-center gap-4 mt-2">
                {icons.map((icon, idx) => <a href={links[idx]} key={icon}>
                        <img src={`${ICONS.PATH}${icon}`} className="h-10 object-contain" /></a>)}
            </div>
        </div>);
    }

    static setBackgroundClass(document) {
        document.body.classList.add("info-background");
        return () => {
            document.body.classList.remove("info-background");
        };
    }
}

export default Utils;