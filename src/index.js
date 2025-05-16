import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.js';
import {BrowserRouter} from 'react-router';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import './index.css';
import { FontProvider } from './context/FontContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

i18next.init({
  interpolation: { escapeValue: false },
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <FontProvider>
        <App />
      </FontProvider>
    </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);