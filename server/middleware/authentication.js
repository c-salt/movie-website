const logger = require('log4js').getLogger('authentication');
const jwt = require('jsonwebtoken');

const secret = process.env.secret;

const withAuth = function(req, res, next) {
  logger.trace('Entering withAuth function in server/middleware/authentication.js');

  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  
  if (!token) {
    logger.warn('The token for the request was not found');
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        logger.warn('The token was not valid for the request');
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        if (req.body.userid === undefined) {
          logger.debug('Token decoded successfully, overwriting the userid');
          req.body.userid = decoded.userid
        }
        logger.info('withAuth userID: ', res.userid)
        logger.trace(`Calling callback function`);
        next();
      }
    });
  }
}
module.exports = withAuth;