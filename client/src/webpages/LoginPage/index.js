import React from 'react';

import { userService } from '../../services';
import { Input } from '../../components/Input';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.getAttribute('referencekey');
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        console.log('Submitting: ', this.state);
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            console.log('Invalid form.');
            return;
        }

        this.setState({ loading: true });
        userService.login(email, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        return (
            <div className="create_account_screen">
                <div className="create_account_form">
                    <h1>Login</h1>
                    <p>Login to your MovieTogether account.</p>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <Input 
                            text="Email Address" 
                            referencekey="email"
                            type="text"
                            value={this.state.email}
                            onChange={this.handleChange} 
                        />
                        <Input 
                            text="Password" 
                            referencekey="password"
                            ref="password"
                            type="password" 
                            value={this.state.password}
                            onChange={this.handleChange} 
                        />
                        <button 
                        type="submit" 
                        className="button button_wide">
                            LOGIN
                        </button>
                    </form>
                    <p>Need an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>
        );
    }
}

export { LoginPage }; 