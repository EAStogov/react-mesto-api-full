import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({ name: name, about: description });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      onSubmit={handleSubmit}
      {...props}
    >
      <input
        placeholder="Имя"
        value={name || ''}
        onChange={handleNameChange}
        type="text"
        name="name"
        required
        minLength={2}
        maxLength={40}
        className="form__input form__input_value_name"
      />
      <span className="form__error form__error_type_name"></span>
      <input
        placeholder="О себе"
        value={description || ''}
        onChange={handleDescChange}
        type="text"
        name="about"
        required
        minLength={2}
        maxLength={200}
        className="form__input form__input_value_about"
      />
      <span className="form__error form__error_type_about"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
