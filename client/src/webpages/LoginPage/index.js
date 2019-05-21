import React from 'react';
import config from 'config';
import axios from 'axios';
import { Input } from '../../components/Input';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.getAttribute('name');
        const value = e.target.value;
        this.setState({ 
            [name]: value 
        });
        //console.log(name, value);
    }

    handleSubmit(e) {
        //console.log('Submitting: ', this.state);
        e.preventDefault();

        const { email, password } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            //console.log('Invalid form.');
            return;
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        fetch(`${config.apiUrl}/session`, {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
            headers: headers,
            body: JSON.stringify(this.state)
        }).then((res) => {
            console.log(res)
            this.props.history.push('/home');
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
                                name="email"
                                type="text"
                                value={this.state.email}
                                onChange={this.handleChange} 
                            />
                            <Input 
                                text="Password" 
                                name="password"
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