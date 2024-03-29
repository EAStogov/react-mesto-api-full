const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnknownError = require('../errors/UnknownError');
const Forbidden = require('../errors/Forbidden');

const getCards = (_req, res, next) => {
  Card.find()
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => {
      const { likes, _id } = newCard;
      res.send({
        data: {
          name, link, owner, likes, _id,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new UnknownError('Что-то пошло не так'));
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Такой карточки не существует'));
      }
      if (JSON.stringify(req.user._id) !== JSON.stringify(card.owner)) {
        return next(new Forbidden('Удалять чужую карточку запрещено'));
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send({ data: deletedCard }))
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequestError('Введены некорректные данные'));
          } else {
            next(new UnknownError('Что-то пошло не так'));
          }
        });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      return res.send({ data: updatedCard });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new UnknownError('Что-то пошло не так'));
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      return res.send({ data: updatedCard });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(new UnknownError('Что-то пошло не так'));
      }
    });
};

module.exports = {
  getCards, postCard, deleteCard, likeCard, dislikeCard,
};
