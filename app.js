const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { createUser, login } = require('./controllers/auth');
const auth = require('./middlewares/auth');

const { ERROR_CODE_NOT_FOUND } = require('./utils/const');

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
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Путь не найден' });
  next();
});

app.listen(PORT);
