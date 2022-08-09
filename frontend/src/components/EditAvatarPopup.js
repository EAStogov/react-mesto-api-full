import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup(props) {
  const inputRef = useRef();

  function cleanForm() {
    inputRef.current.value = "";
  }
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(inputRef.current.value, cleanForm);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitButtonText="Сохранить"
      onSubmit={handleSubmit}
      {...props}
    >
      <input
        ref={inputRef}
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        required
        className="form__input form__input_value_avatar"
      />
      <span className="form__error form__error_type_avatar"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
