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
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleChange(e){
        const name = e.target.getAttribute('ref');
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    handlePasswordChange(e) {
        this.setState({
            password: event.target.value
        }, () => {
            if(!_.isEmpty(this.state.confirmedPassword)){
                this.refs.confirmedPassword.isValid();
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        const allValid = Object.keys(this.refs).every( (key) => {
            return this.refs[key].isValid()
        });
        console.log(allValid);

        // this.setState({ submitted:true });
        // const { email, username, password, confirmedPassword, returnUrl } = this.state;
        
        // if (!(username && password) || !(password == confirmedPassword)){
        //     return;
        // }

        // this.setState({ loading: true });
        // userService.signup(email, username, password)
        //     .then(
        //         user => {
        //             const { from } = this.props.location.state || { from: { pathname: "/" } };
        //             this.props.history.push(from);
        //         },
        //         error => this.setState({ error, loading: false })
        //     );
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validateUsername(name) {
        // Validate it is not taken
        return true;
    }

    validateConfirmedPassword(confirmedPassword) {
        return this.state.password === confirmedPassword;
    }

    render() {
        return(
            <div className="create_account_screen">
                <div className="create_account_form">
                    <h1>Sign Up</h1>
                    <p>Create your MovieTogether user account.</p>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <Input 
                            text="Email Address" 
                            ref="email"
                            type="email"
                            defaultValue={this.state.email} 
                            validate={this.validateEmail}
                            value={this.state.email}
                            onChange={this.handleChange} 
                            errorMessage="Please enter a valid email"
                            emptyMessage="Please enter an email"
                            errorVisible={this.state.showEmailError}
                        />
                        <Input 
                            text="Username" 
                            ref="username"
                            type="text"
                            defaultValue={this.state.username} 
                            validate={this.validateUsername}
                            value={this.state.username}
                            onChange={this.handleChange} 
                            errorMessage="Please enter a valid username"
                            emptyMessage="Please enter a username"
                            errorVisible={false}
                        />
                        <Input 
                            text="Password" 
                            ref="password"
                            type="password"
                            defaultValue={this.state.password}
                            minCharacters="6"
                            requireCapitals={true}
                            requireNumbers={true}
                            requireSpecialCharacters={true}
                            value={this.state.password}
                            hasHelpbox={true}
                            onChange={this.handlePasswordChange} 
                            errorMessage="Please enter a valid password"
                            emptyMessage="Please enter a password"
                            errorVisible={false}
                        />
                        <Input 
                            text="Confirm Password" 
                            ref="confirmedPassword"
                            type="password"
                            defaultValue={this.state.confirmedPassword} 
                            value={this.state.confirmedPassword}
                            onChange={this.handleChange}
                            validate={this.validateConfirmedPassword}
                            errorMessage="Your passwords do not match"
                            emptyMessage="Please confirm your password"
                            errorVisible={false}
                        />
                        <button type="submit" className="button button_wide">
                            CREATE ACCOUNT
                        </button>
                    </form>
                </div>
            </div>
        )

    }

}

export { SignupPage };