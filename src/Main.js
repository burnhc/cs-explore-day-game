import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from "./Home";
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

/* The Switch decides which component to show based on the current URL.*/

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/Page1' component={Page1}/>
            <Route exact path='/Page2' component={Page2}/>
            <Route exact path='/Page3' component={Page3}/>
        </Switch>
    );
}

export default Main;