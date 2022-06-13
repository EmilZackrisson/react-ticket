import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Todo from './todo';
import Settings from './Settings';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log(App)
root.render(
    <>
        <Router>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </Router>
        <Todo />
        <Settings />
    </>
);