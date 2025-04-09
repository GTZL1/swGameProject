import React, { useState, useEffect } from 'react';
import TitleBar from '../../utils/title/title.js';
import SENTENCES from '../../constants/sentences.js';

const QuestionPage = (props) => {
    function QuestionPage() {
        return <TitleBar nameP={SENTENCES.TITLES.QUESTION_TITLE}/>
      }
        
      return <QuestionPage/>;
}

export default QuestionPage;