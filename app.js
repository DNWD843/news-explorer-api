const express = require('express');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  // TODO удалить console.log перед сдачей
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
