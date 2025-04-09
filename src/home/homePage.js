import React, { useState, useEffect } from 'react';
import Title from '../utils/title/title.js';
import ENDPOINTS from '../constants/endpoints.js';
import SENTENCES from '../constants/sentences.js';
import ButtonLink from '../utils/buttons/buttonLink.js';

const HomePage = () => {
  return (<>
  <Title nameP={SENTENCES.TITLES.MAIN_TITLE} />
  <ButtonLink route = {ENDPOINTS.IDENTITY_ENDPOINT}>To identity mode</ButtonLink>
  <ButtonLink route = {ENDPOINTS.QUESTION_ENDPOINT}>To questions mode</ButtonLink>
  </>)
}

export default HomePage