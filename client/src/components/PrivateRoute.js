import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticate } from '../utils/authenticate';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    this.checkAuth();
  }


  checkAuth() {
    authenticate()
      .then((res) => {
        this.setState({ loaded: true, isAuthenticated: res });
      })
      .catch(() => this.props.history.push('/login'));
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, isAuthenticated } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props => (isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        ))}
      />
    );
  }
}

export { PrivateRoute };
