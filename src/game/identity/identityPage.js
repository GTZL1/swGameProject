import React, { useState, useEffect } from 'react';
import TitleBar from '../../utils/title/title.js';
import { useTranslation } from 'react-i18next';
import SENTENCES from '../../constants/sentences.js';

const IdentityPage = () => {
    const {t} = useTranslation();
    
    return (<>
      <title>{SENTENCES.TITLES.MAIN_TITLE}</title>
      <TitleBar nameP={t('titles.identity_title')}/>
    </>);
}

export default IdentityPage;