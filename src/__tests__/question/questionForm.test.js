import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import QuestionForm from '../../game/question/questionForm.js';
import React, { useState, useEffect } from 'react';

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

beforeEach(async () => {
  axios.get.mockResolvedValue(question);
  render(<QuestionFormWrapper />);
  await screen.findByText(new RegExp(question.data.questionTitle, 'i'));
});

const wrongAnswer = "Too bad";
const rightAnswer = "Correct";
const question = {
    data: {
        documentId: '1',
        questionTitle: `What's the name of Sabine's loth-cat ?`,
        answer: 'Murley',
        indication: 'Name',
        imageUrl: '/murley.png'
    }
}

function answerMessage(isCorrect) {
    return (isCorrect ? rightAnswer : wrongAnswer);
}

function QuestionFormWrapper() {
    const [isCorrect, setIsCorrect] = React.useState(null);
    return (
        <QuestionForm
            questionDocId="1"
            isCorrect={isCorrect}
            setIsCorrect={setIsCorrect}
            answerProps={isCorrect !== null && (<p>{answerMessage(isCorrect)}</p>)}
        />
    );
}

test('loads and displays question', async () => {
    expect(screen.queryByText(new RegExp(question.data.questionTitle, 'i'))).toBeInTheDocument();
});

test('submit no answer', async () => {
    fireEvent.click(screen.getByRole('button', { name: /questions/i }));

    expect((screen.getByRole('textbox').value)).toBe(question.data.answer, 'i');
    expect(screen.queryByText(new RegExp(wrongAnswer, 'i'))).toBeInTheDocument();
});

test('submit right answer', async () => {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: question.answer } });
    fireEvent.click(screen.getByRole('button', { name: /questions/i }));

    expect((screen.getByRole('textbox').value)).toBe(question.data.answer, 'i');
    expect(screen.queryByText(new RegExp(wrongAnswer, 'i'))).toBeInTheDocument();
});
/*
test('loading screen works properly', async () => {
    render(<QuestionFormWrapper />);
    expect(await screen.findByText(new RegExp('Loading', 'i'))).toBeInTheDocument();

    axios.get.mockResolvedValue(question);

    expect(await screen.findByText(new RegExp('Loading', 'i'))).not.toBeInTheDocument();
    expect(await screen.findByText(new RegExp(question.data.questionTitle, 'i'))).toBeInTheDocument();
});*/