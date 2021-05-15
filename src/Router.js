import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import EscapeRoomPage from "./EscapeRoomPage";
import FinishPage from "./FinishPage";

const Router = () => {
    return (
        <Switch>
            <Route exact path='/' component={ HomePage }/>
            <Route exact path='/escaperoom' component={ EscapeRoomPage }/>
            <Route exact path='/28s03n48ghg932vcmfknx' component= { FinishPage }/>
        </Switch>
    );
}

export default Router;