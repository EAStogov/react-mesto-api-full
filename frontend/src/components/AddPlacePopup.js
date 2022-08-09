import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup(props) {
  const [inputPlace, setInputPlace] = useState("");
  const [inputLink, setInputLink] = useState("");
  function handlePlaceChange(e) {
    setInputPlace(e.target.value);
  }
  function handleLinkChange(e) {
    setInputLink(e.target.value);
  }
  function cleanForm() {
    setInputPlace("");
    setInputLink("");
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({ about: inputPlace, link: inputLink }, cleanForm);
  }
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      submitButtonText="Создать"
      onSubmit={handleSubmit}
      {...props}
    >
      <input
        value={inputPlace}
        onChange={handlePlaceChange}
        type="text"
        placeholder="Название"
        name="about"
        required
        minLength={2}
        maxLength={30}
        className="form__input form__input_value_about"
      />
      <span className="form__error form__error_type_about"></span>
      <input
        value={inputLink}
        onChange={handleLinkChange}
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
        className="form__input form__input_value_link"
      />
      <span className="form__error form__error_type_link"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
