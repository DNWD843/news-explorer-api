const { isCelebrateError } = require('celebrate');
const { serverErrorMessage } = require('../constants/errorMessages');

/**
 * @module
 * @description Централизованный обработчик ошибок.<br>
 * @since v.1.0.0
 */

const handleErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  let mes;
  if (isCelebrateError(err)) {
    mes = 'Переданы некорректные данные';
  } else if (statusCode === 500) {
    mes = serverErrorMessage;
  } else { mes = message; }

  res.status(statusCode).send({ message: mes });
  next();
};

module.exports = handleErrors;
