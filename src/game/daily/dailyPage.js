import React from 'react';
import TitleBar from '../../utils/title/title.js';
import { useTranslation } from 'react-i18next';
import IdentityBox from './identityBox.js';
import SENTENCES from '../../constants/sentences.js';

const DailyPage = () => {
    const {t} = useTranslation();
    
    return (<>
      <title>{SENTENCES.TITLES.MAIN_TITLE}</title>
      <TitleBar nameP={t('titles.identity_title')}/>
      <IdentityBox />
    </>);
}

export default DailyPage;