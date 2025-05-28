import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import QuestionForm from '../../game/question/questionForm.js';
import React from 'react';

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

async function renderAndWait() {
  render(<QuestionFormWrapper />);
  await screen.findByText(new RegExp(question.data.questionTitle, 'i'));
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
    axios.get.mockResolvedValue(question);
    await renderAndWait();

    expect(screen.queryByText(new RegExp(question.data.questionTitle, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(rightAnswer, 'i'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(wrongAnswer, 'i'))).not.toBeInTheDocument();
});

test('submit right answer', async () => {
    axios.get.mockResolvedValue(question);
    await renderAndWait();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: question.data.answer } });
    fireEvent.click(screen.getByRole('button', { name: /questions/i }));

    expect((screen.getByRole('textbox').value)).toBe(question.data.answer, 'i');
    expect(screen.queryByText(new RegExp(rightAnswer, 'i'))).toBeInTheDocument();
});

test('submit wrong answer', async () => {
    axios.get.mockResolvedValue(question);
    await renderAndWait();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Buggles' } });
    fireEvent.click(screen.getByRole('button', { name: /questions/i }));

    expect(screen.queryByText(new RegExp(wrongAnswer, 'i'))).toBeInTheDocument();
});

test('submit no answer', async () => {
    axios.get.mockResolvedValue(question);
    await renderAndWait();

    fireEvent.click(screen.getByRole('button', { name: /questions/i }));

    expect((screen.getByRole('textbox').value)).toBe(question.data.answer, 'i');
    expect(screen.queryByText(new RegExp(wrongAnswer, 'i'))).toBeInTheDocument();
});