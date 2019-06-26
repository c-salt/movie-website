const jwt = require('jsonwebtoken');

const secret = process.env.secret;

const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        if (req.body.userid === undefined) {
          req.body.userid = decoded.userid
        }
        console.log('withAuth userID: ', res.userid)
        next();
      }
    });
  }
}
module.exports = withAuth;