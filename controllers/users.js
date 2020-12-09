const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const {
  NODE_ENV = 'develop', JWT_SECRET, SALT_ROUND, JWT_MAX_AGE,
} = process.env;

const getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден или не существует');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequestError('Переданы некорректные данные');
        return next(error);
      }
      return next(err);
    });
};

const handleRegister = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, SALT_ROUND)
    .then((hash) => User.create({ email, password: hash, name })
      .then((user) => res.status(200).send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const error = new BadRequestError('Переданы некорректные данные');
          return next(error);
        }
        if (err.name === 'MongoError') {
          const error = new ConflictError('Пользователь с такими данными уже зарегистрирован');
          return next(error);
        }
        return next(err);
      }));
};
const handleLogin = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: JWT_MAX_AGE });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      const error = new UnauthorizedError(err.message);
      return next(error);
    });
};

module.exports = {
  getUserData,
  handleRegister,
  handleLogin,
};
