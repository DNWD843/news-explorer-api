const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
// const ConflictError = require('../errors/conflict-error');

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

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
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

const deleteArticle = ((req, res, next) => Article.findArticleByCredentials(req.params.articleId)
  .then((article) => {
    if (article.owner !== req.user._id) {
      throw new ForbiddenError('Невозможно удалить чужую статью!');
    }
    article.remove();
    return res.status(200).send({ message: `Статья '${article.title}' успешно удалена` });
  })
  .catch(next));

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
