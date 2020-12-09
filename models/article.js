const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Введена некорректная ссылка',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Введена некорректная ссылка',
    },
  },
  owner: {
    type: String,
    select: false,
  },
});

articleSchema.statics.findArticleByCredentials = function fn(id) {
  return this.findById(id)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Статья не найдена или уже удалена');
      }
      return article;
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return Promise.reject(new BadRequestError('Передан невалидный id'));
      }
      if (err.statusCode === 404) {
        return Promise.reject(err);
      }
      return Promise.reject(new Error(err.message));
    });
};

module.exports = mongoose.model('article', articleSchema);
