import config from 'config';

function authenticate() {
  return fetch(`${config.apiUrl}/session/verify`, {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    credentials: 'include', // Don't forget to specify this if you need cookies
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then((res) => {
    if (res.status !== 200) {
      return false;
    }
    return true;
  });
}

export { authenticate };