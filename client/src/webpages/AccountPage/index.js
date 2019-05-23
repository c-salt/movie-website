import React from 'react';
import config from 'config';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      userId: '',
      email: '',
      username: '',
      discordVerified: '',
      emailVerified: ''
    };

  }

  render() {
    fetch(`${config.apiUrl}/user`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((res) => {
      console.log('RESPONSE: ', res);
    });
    return (
      <div><p>TEST PARAGRAPH</p></div>
    );
  }
}

export { AccountPage };