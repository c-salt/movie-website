import React from 'react';
import config from 'config';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      email: '',
      username: '',
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
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((res) => {
      console.log(res);
      this.setState({
        userId: res.userid,
        email: res.email,
        username: res.username,
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
          <h2>USERID</h2>
          <p>{this.state.userId}</p>
          <h2>EMAIL</h2>
          <p>{this.state.email}</p>
          <h2>USERNAME</h2>
          <p>{this.state.username}</p>
          <h2>DISCORD VERIFIED</h2>
          <p>{this.state.discordVerified.toString().toUpperCase()}</p>
          <h2>EMAIL VERIFIED</h2>
          <p>{this.state.emailVerified.toString().toUpperCase()}</p>
          <h3>Return to <a href="/">home.</a></h3>
        </div>
      </div>
    );
  }
}

export { AccountPage };
