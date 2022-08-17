const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { ERROR_CODE_NOT_FOUND } = require('./utils/const');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62fbcda681f5b675cc9299e9',
  };

  next();
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Путь не найден' });
  next();
});

app.listen(PORT);
