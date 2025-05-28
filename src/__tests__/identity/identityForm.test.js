import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import IdentityForm from '../../game/identity/identityForm';

jest.mock('@base-ui-components/react/esm/number-field', () => ({
    __esModule: true,
    NumberField: {
        Root: (props) => <div data-testid="mock-number-field-root" {...props} />,
        Group: (props) => <div data-testid="mock-number-field-group" {...props} />,
        Input: (props) => <input data-testid="mock-number-field-input" {...props} />,
    }
}));
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
const categories = [{name: "Civilians"}, {name: "Jedi"}, {name: "Dumbs"}];
const allegiances = [{ name : 'Comic reliefs' }, { name : 'annoyances' }, { name : 'everything else' }];
const character = {
    data: {
        documentId: '1',
        firstName: 'Jar Jar',
        lastName: 'Binks',
        specie: {name :'Gungan'},
        category: {name :'Dumbs'},
        allegiances: [{ name : 'Comic reliefs' }, { name : 'annoyances' }],
        birthPlanet: { name: 'Naboo' },
        birthYear: 1999,
        deathPlanet: { name : 'Naboo' },
        deathYear : 1999,
        imageUrl: 'jarjar.png'
    }
}

beforeEach(() => {
    axios.get.mockImplementation((url) => {
        if (url.includes('categories')) {
            return Promise.resolve({ data: categories });
        }
        if (url.includes('allegiances')) {
            return Promise.resolve({ data: { data: allegiances } });
        }
        if (url.includes('api/identity/')) {
            return Promise.resolve(character);
        }
        return Promise.reject(new Error('Unknown endpoint: ' + url));
    });
});

async function renderAndWait() {
    render(<IdentityFormWrapper />);
    const inputs = await screen.findAllByRole('input');
    expect(inputs).toBe(7);
}

function answerMessage(isCorrect) {
    return (isCorrect ? rightAnswer : wrongAnswer);
}

function IdentityFormWrapper() {
    const [allCorrect, setAllCorrect] = React.useState(null);
    const [isNoob, setIsNoob] = React.useState(null);
    return (<IdentityForm
        characterDocId = {character.data.documentId}
        allCorrect={allCorrect}
        isNoob={isNoob}
        setAllCorrect={setAllCorrect}
        setIsNoob={setIsNoob}
        answerProps={(allCorrect || isNoob) && <p>{answerMessage(!isNoob)}</p>} />);
}

test('loads identity page', async () => {
    renderAndWait();
});