/* eslint-disable react/prop-types */
import React from 'react';
import config from 'config';
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
    const { value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (!(email && password)) {
      return;
    }

    fetch(`${config.apiUrl}/session`, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(res => res.json()).then((res) => {
      if (res.errorMessage) {
        throw new Error(res.errorMessage);
      }
      this.props.history.push('/home');
    }).catch((err) => {
      alert(err);
    });
  }

  render() {
    return (
      <div className="create_account_screen">
        <div className="create_account_form">
          <div className="form_wrapper">
            <h1>LOGIN</h1>
            <form name="form" onSubmit={this.handleSubmit}>
              <Input
                text="Email Address"
                name="email"
                type="text"
                hasHelpbox={false}
                value={this.state.email}
                onChange={this.handleChange}
              />
              <Input
                text="Password"
                name="password"
                type="password"
                ref="password"
                hasHelpbox={false}
                value={this.state.password}
                onChange={this.handleChange}
              />
              <button
                type="submit"
                className="button button_wide"
              >
                LOGIN
              </button>
            </form>
            <p>
              Need an account?
              <a href="/signup"> Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export { LoginPage };
