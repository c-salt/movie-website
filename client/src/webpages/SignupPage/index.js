import React from 'react';
import config from 'config';
import axios from 'axios';
import { userService } from '../../services';
import { Input } from '../../components/Input';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            email: '',
            username: '',
            password: '',
            confirmedPassword: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateConfirmedPassword = this.validateConfirmedPassword.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleChange(e){
        const name = e.target.getAttribute('name');
        const value = e.target.value;
        this.setState({
            [name]: value
        })
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
        e.preventDefault();
        e.persist();
        const allValid = Object.keys(this.refs).map( (key) => {
            return this.refs[key].isValid()
        }).every(validity => validity);
        if (!allValid) {
            return;
        };
        axios.post(`${config.apiUrl}/user`, this.state).then(res => {
            //console.log(res);
            if (!res.success) {
                alert(res);
            } else {
                alert(res);
            }
        })
    };

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    validateUsername(name) {
        // Validate it is not taken
        return !_.isEmpty(name);
    }

    validateConfirmedPassword(confirmedPassword) {
        return this.state.password === confirmedPassword && this.state.password !== '';
    }

    render() {
        return(
            <div className="create_account_screen">
                <div className="create_account_form">
                    <div className="form_wrapper">
                        <h1>SIGN UP</h1>
                        <h2></h2>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <Input 
                                text="Email Address" 
                                ref="email"
                                name="email"
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
                                ref="username"
                                name="username"
                                type="text"
                                defaultValue={this.state.username} 
                                validate={this.validateUsername}
                                value={this.state.username}
                                onChange={this.handleChange} 
                                errorMessage="Username is not available"
                                emptyMessage="Username can't be empty"
                                errorVisible={false}
                            />
                            <Input 
                                text="Password" 
                                ref="password"
                                name="password"
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
                                name="confirmedPassword"
                                type="password"
                                defaultValue={this.state.confirmedPassword} 
                                value={this.state.confirmedPassword}
                                onChange={this.handleChange}
                                validate={this.validateConfirmedPassword}
                                errorMessage="Your passwords do not match"
                                emptyMessage="Please confirm your password"
                                errorVisible={false}
                            />
                            <button 
                            type="submit" 
                            className="button button_wide">
                            CREATE ACCOUNT
                            </button>
                        </form>
                        <p>Already have an account? <a href="/login">Login</a></p>
                    </div>
                </div>
            </div>
        )

    }

}

export { SignupPage };