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
      <div><p>TEST PARAGRAPH</p>></div>
    );
  }
}

export { AccountPage };