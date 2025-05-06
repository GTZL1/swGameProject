import React from 'react';
import { useFont } from '../../context/FontContext.js';
import { Switch } from '@mui/material';
import { useTranslation } from "react-i18next";

const FontSwitch = ({ style }) => {
    const {
        titleFont,
        setTitleFont,
        contentFont,
        setContentFont,
        useSingleFont,
        toggleSingleFont,
    } = useFont();
    const {t} = useTranslation();

    function toggleFont() {
        // if single font is false, it means it's been toggled to true, so it switches to aurebesh
        if (!useSingleFont) {
            setTitleFont('font-aurebesh');
            setContentFont('font-aurebesh');
        } else {
            setTitleFont('font-starjedi');
            setContentFont('font-sans');
        }
        toggleSingleFont();
    }

    return (<div className={`flex items-center ${style}`}>
                <span className='text-xs'>{t('titles.aurebesh')}</span>
                <Switch onClick={toggleFont} />
            </div>
    );
};

export default FontSwitch;