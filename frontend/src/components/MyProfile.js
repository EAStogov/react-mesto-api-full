import "../index.css";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Header from "./Header";

const MyProfile = ({ isLoggedIn, unSign, userEmail }) => {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isAuthShown, setIsAuthShown] = React.useState(false);

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        alert("Что-то пошло не так. Ошибка: " + err);
      });
    api
      .getInitialCards()
      .then((cardsList) => {
        setCards(cardsList.data);
      })
      .catch((err) => {
        alert("Что-то пошло не так. Ошибка: " + err);
      });
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleUpdateUser = (data) => {
    api
      .editProfile(data)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => {
        alert("Что-то пошло не так. Ошибка: " + err);
      });
  };
  const handleUpdateAvatar = (data, cleanForm) => {
    api
      .editAvatar(data)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
        cleanForm();
      })
      .catch((err) => {
        alert("Что-то пошло не так. Ошибка: " + err);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId === currentUser._id);

    api
      .toggleLikeAction(isLiked, card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard.data : c)));
      })
      .catch((err) => {
        alert("Что-то пошло не так. Ошибка: " + err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((stateCard) => stateCard !== card));
      })
      .catch((err) => {
        alert("Что-то пошло не так. Ошибка: " + err);
      });
  }

  function handleAddPlaceSubmit(data, cleanForm) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
        cleanForm();
      })
      .catch((err) => {
        alert("Что-то пошло не так. Ошибка: " + err);
      });
  }

  function toggleVisibility() {
    setIsAuthShown(!isAuthShown);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        authAction="Выйти"
        route="/signin"
        isAuthShown={isAuthShown}
        toggleVisibility={toggleVisibility}
        unSign={unSign}
      />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        onClose={closeAllPopups}
        submitButtonText="Да"
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
};

export default MyProfile;
