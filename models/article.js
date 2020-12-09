const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

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
      validator: (v) => isURL(v[{ protocols: ['http', 'https'], require_protocol: true }]),
      message: 'Введена некорректная ссылка',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v[{ protocols: ['http', 'https'], require_protocol: true }]),
      message: 'Введена некорректная ссылка',
    },
  },
  owner: {
    type: String,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
