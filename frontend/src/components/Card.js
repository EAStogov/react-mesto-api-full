import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.some((userId) => userId === currentUser._id);
  
  const isOwn = card.owner === currentUser._id;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleCardDelete() {
    onCardDelete(card);
  }
  return (
    <li className="elements__card">
      <img
        src={card.link}
        alt={card.name}
        className="elements__image"
        onClick={handleClick}
      />
      <h2 className="elements__place">{card.name}</h2>
      <button
        type="button"
        onClick={handleCardDelete}
        aria-label
        className={`elements__trash ${!isOwn && "elements__trash_desabled"}`}
      ></button>
      <div className="elements__like-container">
        <button
          type="button"
          onClick={handleLikeClick}
          aria-label
          className={`elements__like ${
            isLiked && "elements__like_active"
          }`}
        ></button>
        <p className="elements__like-count">{card.likes.length}</p>
      </div>
    </li>
  );
}
export default Card;
