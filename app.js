const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const handleErrors = require('./middlewares/handleErrors');

const { PORT = 3000, TO_NEWS_EXPLORER_DB } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
