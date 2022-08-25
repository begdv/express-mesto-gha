const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getMe, getUser, updateMe, updateMeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().min(24).max(24)
      .required(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateMe);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/([a-z0-9]\.|[a-z0-9][a-z0-9-]*[a-z0-9]\.)*[a-z][a-z0-9-]*[a-z0-9](:\d+)?(\/+[a-z0-9$_.+!*'(),;:@&=-]*)*#?$/).required(),
  }),
}), updateMeAvatar);

module.exports = router;
