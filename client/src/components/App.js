import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Icon } from './Icon';
import { PrivateRoute } from './PrivateRoute';
import { HomePage } from '../webpages/HomePage';
import { LoginPage } from '../webpages/LoginPage';
import { SignupPage } from '../webpages/SignupPage';

class App extends React.Component {
    render() {
        return (
            <div className="application_wrapper">
                <div className="application_routeHandler">
                    <Router>
                        <div>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/signup" component={SignupPage} />
                        </div>
                    </Router>
                </div>
                <div className="footer">
                    <p>
                        <a href="https://github.com/c-salt/movie-website" target="_top"><Icon type="github"/></a>
                    </p>
                    <p>
                        <a href="https://github.com/c-salt/movie-bot" target="_top"><Icon type="discord"/></a>
                    </p>
                </div>
            </div>
        );
    }
}

export { App }; 