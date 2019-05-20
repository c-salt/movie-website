import React from 'react';

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
    return (
      <div>
        <h1>Account Page</h1>
      </div>
    );
  }
}

export { AccountPage };