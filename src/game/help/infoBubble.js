import React, { useState, useEffect, useRef } from "react";

const InfoBubble = ({helpMessage}) => {
    const [isVisible, setIsVisible] = useState(false);
    const bubbleRef = useRef(null);

    function toggleBubble() {
        setIsVisible(!isVisible);
    };

    function handleClickOutside(event) {
        if (bubbleRef.current && !bubbleRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className={`flex flex-col items-center h-32`} ref={bubbleRef}>
            <button onClick={toggleBubble}
                className="flex items-center justify-center !bg-transparent !p-0">
                <img className="w-6 object-contain"  
                    src={'/resources/icons/information.png'} alt="Information icon" />
            </button>

            {isVisible && (
                <div className="w-64 bg-slate-400/[.90] rounded-2xl p-2 mt-2 text-justify text-xs text-gray-600">
                    {helpMessage}
                </div>
            )}
        </div>
    );
};

export default InfoBubble;