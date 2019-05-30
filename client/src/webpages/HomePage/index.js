import React from 'react';

class HomePage extends React.Component {
  render() {
    return (
      <div className="home_screen">
        <h1>Welcome To MovieTogether</h1>
        <h3>
          <a href="/account">To My Account</a>
        </h3>
      </div>
    );
  }
}

export { HomePage };
