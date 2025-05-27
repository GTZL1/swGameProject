import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import HomePage from '../../home/homePage';
import { BrowserRouter, Routes, Route } from "react-router";
import QuestionPage from '../../game/question/questionPage';

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

function onHomePage() {
    expect(screen.getByRole('button', { name: /questions/i})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /identity/i})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /challenges/i})).toBeInTheDocument();
}

test('load home page', async () => {
    render(<BrowserRouter>
        <HomePage />
    </BrowserRouter>);

    onHomePage();
});

test('navigates to question page on button click', async () => {
    axios.get.mockResolvedValueOnce({ data : ['1','2'] });
    axios.get.mockResolvedValueOnce(question);
    render(<BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/question" element={<QuestionPage />} />
        </Routes>
    </BrowserRouter>);
    expect(screen.getByRole('button', { name: /questions/i})).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /questions/i }));

    await screen.findByText(new RegExp(question.data.questionTitle, 'i'));

    fireEvent.click(screen.getByRole('link'));

   onHomePage();
});