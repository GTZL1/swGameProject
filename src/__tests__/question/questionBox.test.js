import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import QuestionForm from '../../game/question/questionForm.js';
import React, { useState, useEffect } from 'react';
import QuestionBox from '../../game/question/questionBox.js';

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
const question2 = {
    data: {
        documentId: '2',
        questionTitle: `What's the name of Tora's voorpack ?`,
        answer: 'Buggles',
        indication: 'Name',
        imageUrl: '/buggles.png'
    }
}

async function renderAndWait() {
  render(<QuestionBoxWrapper />);
  await screen.findByText(new RegExp(question.data.questionTitle, 'i'));
}

function QuestionBoxWrapper() {
    return (<QuestionBox />);
}

test('loads and displays question', async () => {
    axios.get.mockResolvedValueOnce({ data : ['1','2'] });
    axios.get.mockResolvedValueOnce(question);
    await renderAndWait();
    
    expect(screen.queryByText(new RegExp(question.data.questionTitle, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(rightAnswer, 'i'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(wrongAnswer, 'i'))).not.toBeInTheDocument();
});

test('changes question', async () => {
    axios.get.mockResolvedValueOnce({ data : ['1','2'] });
    axios.get.mockResolvedValueOnce(question);
    axios.get.mockResolvedValueOnce(question2);
    await renderAndWait();
    
    expect(screen.queryByText(new RegExp(question.data.questionTitle, 'i'))).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: question.data.answer } });
    fireEvent.click(screen.getByRole('button', { name: /questions.button/i }));

    expect(screen.getByRole('button', { name: /new_question/i})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /questions.button/i })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /new_question/i}));

    await screen.findByText(new RegExp(question2.data.questionTitle, 'i'));
});