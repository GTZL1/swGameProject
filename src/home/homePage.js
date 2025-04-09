import React, { useState, useEffect } from 'react';
import ENDPOINTS from '../constants/endpoints.js';
import SENTENCES from '../constants/sentences.js';
import ButtonLink from '../utils/buttons/buttonLink.js';
import TitleBar from '../utils/title/title.js';

const HomePage = () => {
  return (<>
  <TitleBar nameP={SENTENCES.TITLES.MAIN_TITLE} />
  <ButtonLink route = {ENDPOINTS.IDENTITY_ENDPOINT}>To identity mode</ButtonLink>
  <ButtonLink route = {ENDPOINTS.QUESTION_ENDPOINT}>To questions mode</ButtonLink>
  </>)
}

export default HomePage