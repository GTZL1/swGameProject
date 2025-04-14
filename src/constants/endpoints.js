const ENDPOINTS = {
    'HOME' : '/',
    'QUESTION_PAGE' : '/question',
    'IDENTITY_PAGE' : '/identity',
    'BACKEND_URL': 'http://localhost:1337'
};

ENDPOINTS.GET_ALL_QUESTION_DOCIDS = `${ENDPOINTS.BACKEND_URL}/api/question-api/all`;
ENDPOINTS.GET_QUESTION_PER_DOCID = `${ENDPOINTS.BACKEND_URL}/api/question-api/docId?documentId=`;

Object.freeze(ENDPOINTS);
export default ENDPOINTS;