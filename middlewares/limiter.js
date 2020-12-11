const rateLimit = require('express-rate-limit');
const TooManyRequestsError = require('../errors/too-many-requests');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: function f(req, res, next) {
    const error = new TooManyRequestsError('Слишком много запросов с этого IP! Пожалуйста, попробуйте снова позже.');
    next(error);
  },
});

module.exports = limiter;
