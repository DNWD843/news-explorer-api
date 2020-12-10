const { celebrate, Joi } = require('celebrate');

/**
 * @module
 * @description Миддлвэры валидации данных в запросах, касающихся действий со статьями
 *  пользователя<br>
 * Валидация выполняется библиотеками celebrate и Joi.
 * @since v.1.0.0
 */

/**
 * @description Миддлвэр createArticleReqValidator.<br>
 * Валидирует данные в запросе на создание статьи.
 * @since v.1.0.0
 */
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

/**
 * @description Миддлвэр deleteArticleReqValidator.<br>
 * Валидирует данные в запросе на удаление статьи.
 * @since v.1.0.0
 */
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

/**
 * @description Миддлвэр getArticlesReqValidator.<br>
 * Валидирует данные в запросе на получение всех статей пользователя.
 * @since v.1.0.0
 */
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
