const mongoose = require('mongoose');
const User = require('../models/user');
const { ERROR_CODE_DEFAULT, ERROR_CODE_INCORRECT_DATA, ERROR_CODE_NOT_FOUND } = require('../utils/const');

const { ObjectNotFoundError } = require('../utils/utils');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return Promise.reject(new ObjectNotFoundError('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ObjectNotFoundError) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
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
        return Promise.reject(new ObjectNotFoundError('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ObjectNotFoundError) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
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
        return Promise.reject(new ObjectNotFoundError('Пользователь не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof ObjectNotFoundError) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении аватара' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};
