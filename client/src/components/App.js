import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { HomePage } from '../webpages/HomePage';
import { LoginPage } from '../webpages/LoginPage';
import { SignupPage } from '../webpages/SignupPage';

class App extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/signup" component={SignupPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export { App }; 