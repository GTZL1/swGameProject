const ENDPOINTS = {
    'HOME' : '/',
    'QUESTION_PAGE' : '/question',
    'IDENTITY_PAGE' : '/identity',
    'GET_ALL_QUESTION_DOCIDS' : 'http://localhost:1337/api/question-api/all',
    'GET_QUESTION_PER_DOCID' : 'http://localhost:1337/api/question-api/docId?documentId='
}

Object.freeze(ENDPOINTS);
export default ENDPOINTS;