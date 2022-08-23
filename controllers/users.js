const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { ERROR_CODE_DEFAULT, ERROR_CODE_INCORRECT_DATA, ERROR_CODE_NOT_FOUND } = require('../utils/const');

const { ObjectNotFoundError } = require('../utils/utils');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return Promise.reject(new ObjectNotFoundError('Пользователь c запрошенным id не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ObjectNotFoundError) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Запрошенный id пользователя является некорректным' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, hash, name, about, avatar,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        return Promise.reject(new ObjectNotFoundError('Пользователь c запрошенным id не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ObjectNotFoundError) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        return Promise.reject(new ObjectNotFoundError('Пользователь c запрошенным id не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ObjectNotFoundError) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении аватара' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};
