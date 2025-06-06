const ENDPOINTS = {
    'HOME' : '/',
    'QUESTION_PAGE' : '/question',
    'IDENTITY_PAGE' : '/identity',
    'DAILY_PAGE' : '/daily',
    'ABOUT': '/about',
    'HOW_TO': '/how-to',
    'SUPPORT': '/support',
    'BACKEND_URL': 'https://delicate-chickens-6ab648b3a3.strapiapp.com',
    'IMAGE_BACKEND_URL': 'https://asimplestarwarsgame.net/images/',
    'ME_IMAGE': 'heart.png',
    'YT_LINK': 'https://www.youtube.com/@EagleBricks-sw6',
    'INSTA_LINK': 'https://www.instagram.com/dd.eaglebricks'
};

ENDPOINTS.GET_ALL_QUESTION_DOCIDS = `${ENDPOINTS.BACKEND_URL}/api/question-api/all`;
ENDPOINTS.GET_QUESTION_PER_DOCID = `${ENDPOINTS.BACKEND_URL}/api/question-api/docId?documentId=`;
ENDPOINTS.GET_ALL_CHARACTER_DOCIDS = `${ENDPOINTS.BACKEND_URL}/api/identity/all`;
ENDPOINTS.GET_CHARACTER_PER_DOCID = `${ENDPOINTS.BACKEND_URL}/api/identity/docId?documentId=`;
ENDPOINTS.GET_ALL_CATEGORIES = `${ENDPOINTS.BACKEND_URL}/api/character-categories`;
ENDPOINTS.GET_ALL_PLANETS = `${ENDPOINTS.BACKEND_URL}/api/planets`;
ENDPOINTS.GET_ALL_SPECIES = `${ENDPOINTS.BACKEND_URL}/api/species`;
ENDPOINTS.GET_ALL_ALLEGIANCES = `${ENDPOINTS.BACKEND_URL}/api/allegiances`;
ENDPOINTS.DAILY_QUESTIONS = `${ENDPOINTS.BACKEND_URL}/api/daily-questions`;
ENDPOINTS.DAILY_CHARACTERS = `${ENDPOINTS.BACKEND_URL}/api/daily-characters`;

Object.freeze(ENDPOINTS);
export default ENDPOINTS;