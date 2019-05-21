import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticate } from '../utils/authenticate';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      loaded: false,
      isAuthenticated: false
    }
  }

  componentDidMount() {
    this.checkAuth()
  }
  

  checkAuth() {
    authenticate()
      .then((res) => {
        this.setState({ loaded: true, isAuthenticated: res })
      })
      .catch(() => this.props.history.push('/login'))
  }

  render() {
    const { component: Component, ...rest } = this.props
    const { loaded , isAuthenticated} = this.state
    if (!loaded) return null
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }}
      />
    )
  }
}

export { PrivateRoute };

// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         authenticate() ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }}
//           />
//         )
//         // authenticate().then(res => {
//         //   console.log(res);
//         //   res ? ( <Component {...props} /> ) : (
//         //     <Redirect to={{
//         //         pathname: "/login",
//         //         state: { from: props.location }
//         //       }}
//         //     />
//         //   )
//         // }) 
//       }
//     />
//   );
// }

// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import axios from 'axios';
// import config from 'config';

// export default function PrivateRoute (ComponentToProtect) {
//   return class extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         loading: true,
//         redirect: false,
//       };
//     }

//     componentDidMount() {
//       var headers = new Headers();
//       headers.append('Content-Type', 'application/json');
//       headers.append('Accept', 'application/json');
//       fetch(`${config.apiUrl}/session/verify`, {
//           method: 'GET',
//           mode: 'cors',
//           redirect: 'follow',
//           credentials: 'include', // Don't forget to specify this if you need cookies
//           headers: headers,
//       }).then((res) => {
//         if (res.status !== 200) {
//           throw new Error();
//         }
//       }).catch(e => {
//         console.log('Catch: ', e);
//         this.setState({ loading: false, redirect: true });
//       });
//     }

//     render() {
//       const { loading, redirect } = this.state;
//       console.log('loading: ', loading, 'redirect: ', redirect);
//       if (loading) {
//         return null;
//       }
//       if (redirect) {
//         return <Redirect to="/login" />;
//       }
//       return (
//         <ComponentToProtect {...this.props} />
//       );
//     }
//   }
// }