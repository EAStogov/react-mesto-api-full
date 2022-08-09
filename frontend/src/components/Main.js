import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  ...props
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <button
          aria-label
          onClick={onEditAvatar}
          type="button"
          id="avatar"
          className="profile__button profile__button_type_avatar"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__avatar"
          />
        </button>
        <div className="profile__edit-author-container">
          <div className="profile__author">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            aria-label
            onClick={onEditProfile}
            type="button"
            id="edit"
            className="profile__button profile__button_type_edit page__button"
          ></button>
        </div>
        <button
          aria-label
          onClick={onAddPlace}
          type="button"
          id="add"
          className="profile__button profile__button_type_add page__button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                {...props}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
