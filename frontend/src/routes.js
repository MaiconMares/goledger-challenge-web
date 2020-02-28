import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';

function Routes() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/contacts" component={Contacts}/>
                    <Route path="/profile" component={Profile}/>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default Routes;