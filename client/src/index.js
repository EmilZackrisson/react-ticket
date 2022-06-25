import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import Todo from './todo';
import Settings from './Settings';
import Login from './Login';
import Logout from './Logout';
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
                <Route exact path='/logout' element={<Logout/>}/>
            </Routes>
        </Router>
        {/* <Todo /> */}
    </>
);