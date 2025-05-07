import React, { createContext, useState, useContext } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
    const [titleFont, setTitleFont] = useState('font-starjedi');
    const [contentFont, setContentFont] = useState('font-sans');
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