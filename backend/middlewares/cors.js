const urls = require('../constants/constants');

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Request-Headers', true);

  if (urls.includes(origin)) {
    res.header('Access-Control-Request-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Request-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Request-Headers', requestHeaders);
    res.end();
  }
  next();
};
