/**
 * Return authorization header with basic auth credentials
 * @return {Object}
 */
export function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.authdata) {
    return { Authorization: `Basic ${user.authdata}` };
  }
  return {};
}
