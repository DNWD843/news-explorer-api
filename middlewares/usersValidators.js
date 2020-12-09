const { celebrate, Joi } = require('celebrate');

const handleRegisterReqValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(3).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const handleLoginReqValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(3).required(),
  }),
});

const getUserDataReqValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string()
      .pattern(/^Bearer.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      .required(),
  }).unknown(true),
});

module.exports = {
  handleRegisterReqValidator,
  handleLoginReqValidator,
  getUserDataReqValidator,
};
