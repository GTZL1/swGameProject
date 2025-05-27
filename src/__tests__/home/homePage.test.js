import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from '../../home/homePage';
import { BrowserRouter, MemoryRouter } from "react-router-dom";

jest.mock('axios');
jest.mock('../../context/FontContext.js', () => ({
    useFont: () => ({
        contentFont: 'mock-font',
        setTitleFont: jest.fn(),
        setContentFont: jest.fn(),
        useSingleFont: false,
        toggleSingleFont: jest.fn(),
    }),
}));

test('load home page', async () => {
    render(<BrowserRouter>
        <HomePage />
    </BrowserRouter>);

    expect(screen.getByRole('button', { name: /questions/i})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /identity/i})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /challenges/i})).toBeInTheDocument();
});

test('navigates to question page on button click', async () => {
    render(<MemoryRouter initialEntries={['/']}>
        <HomePage />
    </MemoryRouter>);

    const questionButton = screen.getByRole('button', { name: /question/i });
    await userEvent.click(questionButton);

    expect(window.location.pathname).toBe('/question');
});