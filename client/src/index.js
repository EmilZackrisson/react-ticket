import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Todo from './todo';
import IssueForm from './issueForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log(App)
root.render(
    <>
        {/* <IssueForm /> */}
        <App />
        
        <Todo />
    </>
);