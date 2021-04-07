import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from "./Home";
import TerminalPuzzle from './TerminalPuzzle';
import Page2 from './Page2';
import GraphPuzzle from './GraphPuzzle';

/* The Switch decides which component to show based on the current URL.*/

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/TerminalPuzzle' component={TerminalPuzzle}/>
            <Route exact path='/Page2' component={Page2}/>
            <Route exact path='/GraphPuzzle' component={GraphPuzzle}/>
        </Switch>
    );
}

export default Main;