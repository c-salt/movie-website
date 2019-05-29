import React from 'react';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { user, users } = this.state;
    return (
      <div className="home_screen">
        <h3><a href="/account">-> To My Account</a></h3>
      </div>
    );
  }
}

export { HomePage };
