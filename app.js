const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { createUser, login } = require('./controllers/auth');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(helmet());

app.use(bodyParser.json());

app.post('/users/signup', createUser);
app.post('/users/signin', login);

app.use(auth);

app.use(require('./routes/index'));

app.use((req, res, next) => {
  try {
    throw new NotFoundError('Путь не найден');
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT);
