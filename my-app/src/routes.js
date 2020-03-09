import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import Home from './pages/Home';

import getHashParams from './utils/getHashParams';

const token = getHashParams().access_token;

function PrivateRoute({ component: Component, ...rest }) {
    return(
        <Route {...rest} 
            render={props => 
                    token !== undefined ? (<Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            } 
        />
    )
}

const Routes = () => (
    <BrowserRouter>
        <div id="app">
        {token && <Sidebar />}
        <Switch>
            <Route exact path="/login" component={Login} />            
            <PrivateRoute path="/" component={Home} />
        </Switch>
        </div>
    </BrowserRouter>
)

export default Routes;