const { celebrate, Joi } = require('celebrate');

const createArticleReqValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string()
      .pattern(/^Bearer.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      .required(),
  }).unknown(true),
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string()
      .pattern(/^https?:\/\/(www\.)?[\w\-.]+\.[a-z]{2,3}\b[\w/\-?=&$%]*(\.[a-z]{3})?#?$/i)
      .required(),
    image: Joi.string()
      .pattern(/^https?:\/\/(www\.)?[\w\-.]+\.[a-z]{2,3}\b[\w/\-?=&$%]*(\.[a-z]{3})?#?$/i)
      .required(),
  }),
});

const deleteArticleReqValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string()
      .pattern(/^Bearer.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      .required(),
  }).unknown(true),
  params: Joi.object().keys({
    articleId: Joi.string().hex().required(),
  }),
});

const getArticlesReqValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string()
      .pattern(/^Bearer.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      .required(),
  }).unknown(true),
});

module.exports = {
  createArticleReqValidator,
  deleteArticleReqValidator,
  getArticlesReqValidator,
};
