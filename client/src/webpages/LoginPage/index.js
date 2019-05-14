import React from 'react';
import config from 'config';
import axios from 'axios';
import { userService } from '../../services';
import { Input } from '../../components/Input';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            email: '',
            password: '',
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

        const { email, password } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            console.log('Invalid form.');
            return;
        }

        axios.post(`${config.apiUrl}/session`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: this.state
        }).then(res => {
            if (res.status === 200) {
                this.props.history.push('/');
              } else {
                const error = new Error(res.errorMessage);
                throw error;
              }
        }).catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    }

    render() {
        return (
            <div className="create_account_screen">
                <div className="create_account_form">
                    <div className="form_wrapper">
                        <h1>LOGIN</h1>
                        <h2></h2>
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
            </div>
        );
    }
}

export { LoginPage }; 