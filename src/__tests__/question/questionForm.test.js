import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import QuestionForm from '../../game/question/questionForm.js';

jest.mock('axios');
jest.mock('../../game/help/loadingScreen.js', () => () => <div>Loading...</div>);
jest.mock('../../context/FontContext.js', () => ({
    useFont: () => ({
        contentFont: 'mock-font',
        setTitleFont: jest.fn(),
        setContentFont: jest.fn(),
        useSingleFont: false,
        toggleSingleFont: jest.fn(),
    }),
}));

const question = {
    data: {
        documentId: '1',
        questionTitle: `What's the name of Sabine's loth-cat ?`,
        answer: 'Murley',
        indication: 'Name',
        imageUrl: '/murley.png'
    }
}

test('loads and displays question', async () => {
    axios.get.mockResolvedValue(question);

    render(<QuestionForm questionDocId="1" isCorrect={null} setIsCorrect={() => {}} />);
    expect(await screen.findByText(new RegExp(question.data.questionTitle, 'i'))).toBeInTheDocument();
});