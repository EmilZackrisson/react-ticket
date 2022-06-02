import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Todo from './todo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <App />
        <Todo />
    </>
);