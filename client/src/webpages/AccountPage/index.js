import React from 'react';
import config from 'config';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      email: '',
      username: '',
      permissionLevel: 0,
      discordVerified: false,
      emailVerified: false,
    };

    fetch(`${config.apiUrl}/user`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(res => res.json()).then((res) => {
      this.setState({
        userId: res.userid,
        email: res.email,
        username: res.username,
        permissionLevel: res.permission_level,
        discordVerified: !!res.discord_verified,
        emailVerified: !!res.email_verified,
      });
    });
  }

  render() {
    return (
      <div className="view_account_screen">
        <h1>ACCOUNT PAGE</h1>
        <div className="account_fields_wrapper">
          <h2>Hello, {this.state.username}</h2>
          <h3 className="account_info_field">USER ID</h3>
          <p>{this.state.userId}</p>
          <h3>PERMISSION LEVEL</h3>
          <p>{this.state.permissionLevel}</p>
          <h3>EMAIL</h3>
          <p>{this.state.email}</p>
          <h3>DISCORD VERIFIED</h3>
          <p>{this.state.discordVerified.toString().toUpperCase()}</p>
          <h3>EMAIL VERIFIED</h3>
          <p>{this.state.emailVerified.toString().toUpperCase()}</p>
          <h4>
            Return to
            <a href="/"> home.</a>
          </h4>
        </div>
      </div>
    );
  }
}

export { AccountPage };
