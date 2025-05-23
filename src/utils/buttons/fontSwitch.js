import React from 'react';
import { useFont } from '../../context/FontContext.js';
import { Switch } from '@mui/material';
import { useTranslation } from "react-i18next";
import { TITLE_FONT, CONTENT_FONT, AUREBESH_FONT } from "../../constants/constants.js"; 

const FontSwitch = ({ style }) => {
    const {
        setTitleFont,
        setContentFont,
        contentFont,
        useSingleFont,
        toggleSingleFont,
    } = useFont();
    const {t} = useTranslation();
    const buttonTitle = t('titles.aurebesh');

    function toggleFont() {
        // if single font is false, it means it's been toggled to true, so it switches to aurebesh
        if (!useSingleFont) {
            setTitleFont(AUREBESH_FONT);
            setContentFont(AUREBESH_FONT);
        } else {
            setTitleFont(TITLE_FONT);
            setContentFont(CONTENT_FONT);
        }
        toggleSingleFont();
    }

    return (<div className={`flex flex-col sm:flex-row items-end sm:items-center ${style}`}>
                <span className={`text-xs ${contentFont} order-2 sm:order-none mr-1 sm:mr-0`}
                    dangerouslySetInnerHTML={{__html : buttonTitle}} />
                <Switch className='order-1 sm:order-none'
                    onClick={toggleFont} checked={useSingleFont} />
            </div>
    );
};

export default FontSwitch;