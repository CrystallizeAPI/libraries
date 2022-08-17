import React from 'react';
import ReactDOM from 'react-dom';
import './css/app.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';

console.log(process.env.REACT_APP_BASENAME || 'libraries')

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.REACT_APP_BASENAME || 'libraries'}>
            <IconContext.Provider value={{ className: 'r-icon' }}>
                <App />
            </IconContext.Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
