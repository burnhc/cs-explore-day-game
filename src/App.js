import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import Main from "./Main";

const App = () => (
    <div>
        <h1>CS Explore Day</h1>
        <Navigation />
        <div id='app'>
            <Main />
        </div>
    </div>
);

const Navigation = () => (
    <nav>
        <li><NavLink to='/'>Home</NavLink></li>
    </nav>
);

export default App;