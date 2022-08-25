const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getMe, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().min(24).max(24)
      .required(),
  }),
}), getUser);

router.get('/me', getMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/([a-z0-9]\.|[a-z0-9][a-z0-9-]*[a-z0-9]\.)*[a-z][a-z0-9-]*[a-z0-9](:\d+)?(\/+[a-z0-9$_.+!*'(),;:@&=-]*)*#?$/).required(),
  }),
}), updateAvatar);

module.exports = router;
