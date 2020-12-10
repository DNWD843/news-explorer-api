const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

/**
 * @module
 * @description Контроллеры модели Article.<br>
 * Обрабатывают запросы:<br>
 *  - GET /articles - возвращает все статьи пользователя<br>
 *  - POST /articles - сохраняет статью в коллекции пользователя<br>
 *  - DELETE /articles/:articlesId - удаляет статью из коллекции пользователя<br>
 * @since v.1.0.0
 */

/**
 * @description Контроллер getArticles()<br>
 * Получает данные всех статей пользователя и отправляет их пользователю.<br>
 * Обрабатываeт запрос GET /articles
 * @returns {JSON}
 * @since v.1.0.0
 * @instance
 * @public
 */
const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError('Статьи не найдены или не существуют');
      }
      return res.status(200).send(articles);
    })
    .catch(next);
};

/**
 * @description Контроллер createArticle()<br>
 * Сохраняет статью в коллекции пользователя.<br>
 * Обрабатываeт запрос POST /articles
 * @property {String} req.body.keyword - ключевое слово, по которому искалась статья
 * @property {String} req.body.title - заголовок статьи
 * @property {String} req.body.text - текст статьи
 * @property {String} req.body.date - дата статьи
 * @property {String} req.body.source - источник статьи
 * @property {String} req.body.link -  ссылка на статью
 * @property {String} req.body.image -ссылка на иллюстрацию к статье
 * @returns {JSON}
 * @instance
 * @since v.1.0.0
 * @public
 */
const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  /**
   * @param {String} owner - при создании статьи добавляем поле owner, в которое
   *  записываем _id пользователя, создающего статью
   * @ignore
   */
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(200).send({ message: `Статья '${article.title}' успешно сохранена!` }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequestError('Переданы некорректные данные');
        return next(error);
      }
      return next(err);
    });
};

/**
 * @description Контроллер deleteArticle()<br>
 * Удаляет статью по её идентификатору, возвращает сообщение об успешном удалении<br>
 * Обрабатываeт запрос DELETE /articles/:articleId
 * @returns {JSON}
 * @since v.1.0.0
 * @instance
 * @public
 */
const deleteArticle = ((req, res, next) => Article.findById(req.params.articleId)
  .select('+owner')
  .then((article) => {
    if (!article) {
      throw new NotFoundError('Статья не найдена или уже удалена');
    }
    if (article.owner !== req.user._id) {
      throw new ForbiddenError('Невозможно удалить чужую статью!');
    }
    article.remove();
    return res.status(200).send({ message: `Статья '${article.title}' успешно удалена` });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new BadRequestError('Передан невалидный id');
      return next(error);
    }
    return next(err);
  }));

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
