import React, { useState, useEffect } from 'react';
import Title from '../../utils/title/title.js';
import { useTranslation } from 'react-i18next';

const IdentityPage = () => {
    const {t} = useTranslation();

    function IdentityPage() {
      return <Title nameP={t('titles.identity_title')}/>
    }
     
    return <IdentityPage/>;
}

export default IdentityPage;