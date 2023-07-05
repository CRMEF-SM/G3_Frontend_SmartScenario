import React from 'react';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 080021d0f09e2c39b6c58a1b49335fedc7ad3154
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
<<<<<<< HEAD
=======
=======
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
>>>>>>> 5d5ef5a9a0ced4d1ec7c196f57080f700f1bccc2
>>>>>>> 080021d0f09e2c39b6c58a1b49335fedc7ad3154
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
