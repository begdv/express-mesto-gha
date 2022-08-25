const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getMe, getUser, updateMe, updateMeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.get('/me', getMe);

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
