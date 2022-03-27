import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <IconContext.Provider value={{ className: 'r-icon' }}>
                <App />
            </IconContext.Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
