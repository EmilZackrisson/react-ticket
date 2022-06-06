import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Todo from './todo';
import Settings from './Settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log(App)
root.render(
    <>
        {/* <IssueForm /> */}
        <App />
        
        <Todo />
        <Settings />
    </>
);