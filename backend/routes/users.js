const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  getUsers, getUser, getMe, updateUserProfile, updateUserAvatar, logout,
} = require('../controllers/users');

router.get('', getUsers);

router.get('/me', getMe);

router.delete('/me', logout);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateUserAvatar);

module.exports = router;
