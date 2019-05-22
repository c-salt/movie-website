import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Icon } from './Icon';
import { PrivateRoute } from './PrivateRoute';
import { HomePage } from '../webpages/HomePage';
import { LoginPage } from '../webpages/LoginPage';
import { SignupPage } from '../webpages/SignupPage';
import { AccountPage } from '../webpages/AccountPage';

class App extends React.Component {
    render() {
        return (
            <div className="application_wrapper">
                <div className="application_routeHandler">
                    <Router>
                        <Switch>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/signup" component={SignupPage} />
                            <PrivateRoute path="/home" component={ HomePage } />
                            <PrivateRoute path="/account" component={AccountPage} />
                        </Switch>
                    </Router>
                    <div className="footer">
                        <p>
                            <a href="https://github.com/c-salt/movie-website" target="_top"><Icon type="github"/></a>
                        </p>
                        <p>Developed by Elijah Sattler & Justen Caldwell</p>
                    </div>
                </div>
            </div>
        );
    }
}

export { App }; 