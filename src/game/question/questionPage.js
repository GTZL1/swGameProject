import React, { useState, useEffect } from 'react';
import Title from '../../utils/title/title.js';
import SENTENCES from '../../constants/sentences.js';

const QuestionPage = (props) => {
    function QuestionPage() {
        return <Title nameP={SENTENCES.TITLES.QUESTION_TITLE}/>
      }
        
      return <QuestionPage/>;
}

export default QuestionPage;