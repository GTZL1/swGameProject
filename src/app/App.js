import { Routes, Route } from 'react-router';
import HomePage from '../home/homePage.js';
import QuestionPage from '../game/question/questionPage.js';
import ENDPOINTS from '../constants/endpoints.js';
import IdentityPage from '../game/identity/identityPage.js';
import DailyPage from '../game/daily/dailyPage.js';
import AboutPage from '../info/aboutPage.js';
import HowToPage from '../info/howToPage.js';
import SupportPage from '../info/supportPage.js';

export default function App() {
    return (<>
        <Routes>
            <Route path={ENDPOINTS.HOME} element={<HomePage />} />
            <Route path={ENDPOINTS.QUESTION_PAGE} element={<QuestionPage />} />
            <Route path={ENDPOINTS.IDENTITY_PAGE} element={<IdentityPage />} />
            <Route path={ENDPOINTS.DAILY_PAGE} element={<DailyPage />} />
            <Route path={ENDPOINTS.ABOUT} element={<AboutPage />} />
            <Route path={ENDPOINTS.HOW_TO} element={<HowToPage />} />
            <Route path={ENDPOINTS.SUPPORT} element={<SupportPage />} />
        </Routes>
    </>);
}