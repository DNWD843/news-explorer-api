const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { NODE_ENV = 'develop', JWT_SECRET } = process.env;

/**
 * @module
 * @description Миддлвэр проверки права доступа пользователя.<br>
 * Если пользователь зарегистрирован и передал достоверные и валидные данные при авторизации,
 *  он становится авторизованным и получает право на доступ к информации и взаимодействие с ней.
 * @since v.1.0.0
 */
const authorizationCheck = (req, res, next) => {
  const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new UnauthorizedError('Необходима авторизация');
    return next(error);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    const error = new UnauthorizedError('Необходима авторизация');
    return next(error);
  }
  req.user = payload;
  return next();
};

module.exports = { authorizationCheck };
