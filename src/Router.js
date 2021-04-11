import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from "./HomePage";
import EscapeRoomPage from "./EscapeRoomPage";
import NavigationRoomPage from "./NavigationRoomPage";

const Router = () => {
    return (
        <Switch>
            <Route exact path='/' component={ HomePage }/>
            <Route exact path='/EscapeRoomPage' component={ EscapeRoomPage }/>
            <Route exact path='/NavigationRoomPage' component={ NavigationRoomPage }/>
        </Switch>
    );
}

export default Router;