import React, { useState, useEffect } from 'react';
import Title from '../../utils/title/title.js';
import SENTENCES from '../../constants/sentences.js';

const IdentityPage = (props) => {
    function IdentityPage() {
        return <Title nameP={SENTENCES.TITLES.IDENTITY_TITLE}/>
      }
        
      return <IdentityPage/>;
}

export default IdentityPage;