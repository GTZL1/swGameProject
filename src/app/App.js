import { Routes, Route } from 'react-router';
import HomePage from '../home/homePage.js';
import QuestionPage from '../game/question/questionPage.js';
import ENDPOINTS from '../constants/endpoints.js';
import IdentityPage from '../game/identity/identityPage.js';

export default function App() {
  return (
  <>
    <Routes>
      <Route path={ENDPOINTS.HOME} element={<HomePage />} />
      <Route path={ENDPOINTS.QUESTION_PAGE} element={<QuestionPage />} />
      <Route path={ENDPOINTS.IDENTITY_PAGE} element={<IdentityPage />} />
    </Routes>
  </>
  );
}