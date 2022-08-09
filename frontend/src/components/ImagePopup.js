function ImagePopup({ card, onClose }) {
  return (
    <section
      id="image-popup"
      className={`popup ${card.name && "popup_opened"}`}
    >
      <div className="popup__image-container">
        <figure>
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption
            id="image-description"
            className="popup__image-description"
          >
            {card.name}
          </figcaption>
        </figure>
        <button
          aria-label
          type="button"
          className="popup__close page__button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
