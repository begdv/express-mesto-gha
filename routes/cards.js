const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, removeCard, addLike, removeLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(/^https?:\/\/([a-z0-9]\.|[a-z0-9][a-z0-9-]*[a-z0-9]\.)*[a-z][a-z0-9-]*[a-z0-9](:\d+)?(\/+[a-z0-9$_.+!*'(),;:@&=-]*)*#?$/).required(),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().min(24).max(24)
      .required(),
  }),
}), removeCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().min(24).max(24)
      .required(),
  }),
}), addLike);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().min(24).max(24)
      .required(),
  }),
}), removeLike);

module.exports = router;
