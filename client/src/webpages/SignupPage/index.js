import React from 'react';

import { userService } from '../../services';
import { Input } from '../../components/Input';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            email: '',
            username: '',
            password: '',
            confirmedPassword: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateConfirmedPassword = this.validateConfirmedPassword.bind(this);
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault()

        this.setState({ submitted:true });
        const { email, username, password, confirmedPassword, returnUrl } = this.state;
        
        if (!(username && password) || !(password == confirmedPassword)){
            return;
        }

        this.setState({ loading: true });
        userService.signup(email, username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }

    validateUsername(name) {
        // Validate it is not taken
        return true;
    }

    validateConfirmedPassword(confirmedPassword) {
        return this.state.password === confirmedPassword
    }

    render() {
        const { email, username, password, confirmedPassword, submitted, loading, error } = this.state;
        return(
            <div className="application_wrapper">
                <div className="application_routeHandler">
                    <div className="create_account_screen">
                        <div className="create_account_form">
                            <h1>Sign Up</h1>
                            <p>Create your MovieTogether user account.</p>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <Input 
                                    text="Email Address" 
                                    referenceKey="email"
                                    type="email"
                                    defaultValue={this.state.email} 
                                    validate={this.validateEmail}
                                    value={this.state.email}
                                    onChange={this.handleChange} 
                                    errorMessage="Email is invalid"
                                    emptyMessage="Email can't be empty"
                                    errorVisible={this.state.showEmailError}
                                />
                                <Input 
                                    text="Username" 
                                    referenceKey="username"
                                    type="text"
                                    defaultValue={this.state.username} 
                                    validate={this.validateUsername}
                                    value={this.state.username}
                                    onChange={this.handleChange} 
                                    errorMessage="This username is not available"
                                    emptyMessage="Username can't be empty"
                                    errorVisible={false}
                                />
                                <Input 
                                    text="Password" 
                                    referenceKey="password"
                                    type="password"
                                    defaultValue={this.state.password} 
                                    value={this.state.password}
                                    hasHelpbox={true}
                                    onChange={this.handleChange} 
                                    errorMessage="Password must be good"
                                    emptyMessage="Password can't be empty"
                                    errorVisible={false}
                                />
                                <Input 
                                    text="Confirm Password" 
                                    referenceKey="confirmedPassword"
                                    type="password"
                                    defaultValue={this.state.confirmedPassword} 
                                    value={this.state.confirmedPassword}
                                    onChange={this.handleChange}
                                    validate={this.validateConfirmedPassword}
                                    errorMessage="Passwords must match"
                                    emptyMessage="Password can't be empty"
                                    errorVisible={false}
                                />
                                <button 
                                type="submit" 
                                className="button button_wide">
                                CREATE ACCOUNT
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export { SignupPage };