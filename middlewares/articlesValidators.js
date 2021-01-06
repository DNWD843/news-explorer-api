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
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string()
      .pattern(
        /^https?:\/\/(www\.)?[\w\-.]+\.[a-z]{2,3}\b[\w/\-?=&$%.:;_]*(\.[a-z]{3})?#?$/i,
      )
      .required()
      .error(new Error('Передана некорректная ссылка')),
    image: Joi.string()
      .pattern(
        /^https?:\/\/(www\.)?[\w\-.]+\.[a-z]{2,3}\b[\w/\-?=&$%.:;_]*(\.[a-z]{3})?#?$/i,
      )
      .required()
      .error(new Error('Передана некорректная ссылка на изображение')),
  }),
});

/**
 * @description Миддлвэр deleteArticleReqValidator.<br>
 * Валидирует данные в запросе на удаление статьи.
 * @since v.1.0.0
 */
const deleteArticleReqValidator = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().required(),
  }),
});

module.exports = {
  createArticleReqValidator,
  deleteArticleReqValidator,
};
