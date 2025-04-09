import React, { useState, useEffect } from 'react';
import TitleBar from '../../utils/title/title.js';
import { useTranslation } from 'react-i18next';

const QuestionPage = () => {
    const { t } = useTranslation();

    function QuestionPage() {
        return <TitleBar nameP={t('titles.question_title')}/>
      }
        
      return <QuestionPage/>;
}

export default QuestionPage;