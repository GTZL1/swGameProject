import React, { createContext, useState, useContext } from 'react';
import { TITLE_FONT, CONTENT_FONT } from "../constants/constants.js"; 

const FontContext = createContext();

export const FontProvider = ({ children }) => {
    const [titleFont, setTitleFont] = useState(TITLE_FONT);
    const [contentFont, setContentFont] = useState(CONTENT_FONT);
    const [useSingleFont, setUseSingleFont] = useState(false);

    const toggleSingleFont = () => {
        setUseSingleFont((prev) => !prev);
    };

    return (
        <FontContext.Provider
            value={{
                titleFont,
                setTitleFont,
                contentFont,
                setContentFont,
                useSingleFont,
                toggleSingleFont,
            }}
        >
            {children}
        </FontContext.Provider>
    );
};

export const useFont = () => useContext(FontContext);