const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const handleErrors = require('./middlewares/handleErrors');
const { getUserData, handleRegister, handleLogin } = require('./controllers/users');
const { getArticles, createArticle, deleteArticle } = require('./controllers/articles');

const { PORT = 3000, TO_NEWS_EXPLORER_DB } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', handleRegister);
app.post('/signin', handleLogin);

app.use((req, res, next) => {
  // TODO: удалить замоканного юзера
  req.user = {
    // _id: '5fd0c7698dd7acc09812a43d',
    _id: '5fd0c60fe6b828bf9ffea750',
  };
  next();
});
app.get('/users/me', getUserData);
app.get('/articles', getArticles);
app.post('/articles', createArticle);
app.delete('/articles/:articleId', deleteArticle);
app.use(handleErrors);

mongoose.connect(TO_NEWS_EXPLORER_DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  // TODO удалить console.log перед сдачей
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
