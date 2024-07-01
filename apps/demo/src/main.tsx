import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/app.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename={'libraries'}>
            <IconContext.Provider value={{ className: 'r-icon' }}>
                <App />
            </IconContext.Provider>
        </BrowserRouter>
    </React.StrictMode>,
);
