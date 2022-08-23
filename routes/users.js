const router = require('express').Router();
const {
  getUsers, getUser, createUser, login, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.post('/signup', createUser);

router.post('/signin', login);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
