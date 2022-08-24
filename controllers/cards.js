const mongoose = require('mongoose');
const Card = require('../models/card');
const { ERROR_CODE_DEFAULT, ERROR_CODE_INCORRECT_DATA, ERROR_CODE_NOT_FOUND } = require('../utils/const');

const { ObjectNotFoundError } = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => Card.findById(card._id)
      .populate('owner')
      .populate('likes')
      .then((cardPopulated) => res.send({ data: cardPopulated })))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.removeCard = (req, res) => {
  Card.findOneAndRemove({ id_: req.params.cardId, owner: req.user._id })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        return Promise.reject(new ObjectNotFoundError('Карточка c запрошенным id не найдена'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Запрошенный id карточки является некорректным' });
        return;
      }
      if (err instanceof ObjectNotFoundError) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        return Promise.reject(new ObjectNotFoundError('Карточка c запрошенным id не найдена'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Запрошенный id карточки является некорректным' });
        return;
      }
      if (err instanceof ObjectNotFoundError) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        return Promise.reject(new ObjectNotFoundError('Карточка c запрошенным id не найдена'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Запрошенный id карточки является некорректным' });
        return;
      }
      if (err instanceof ObjectNotFoundError) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};
