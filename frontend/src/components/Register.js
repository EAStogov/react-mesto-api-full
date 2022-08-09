import { NavLink } from "react-router-dom";
import { useState } from "react";
import Form from "./Form";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";
const Register = ({ isLoggedIn, onSubmit, onClosePopup, isOpen, isSucces }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(password, email);
  }
  return (
    <>
      <Header isLoggedIn={isLoggedIn} authAction="Войти" route="/signin" />
      <Form
        name="register"
        title="Регистрация"
        isForAuth={true}
        submitButtonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email || ""}
          placeholder="Email"
          name="about"
          onChange={handleEmailChange}
          required
          minLength={2}
          maxLength={30}
          className="form__input form__input_auth"
        />
        <span className="popup__error popup__error_type_about"></span>
        <input
          type="password"
          value={password || ""}
          placeholder="Пароль"
          name="link"
          onChange={handlePasswordChange}
          required
          className="form__input form__input_auth"
        />
      </Form>
      <p className="register__sign-in">
        Уже зарегистрированы?{" "}
        <NavLink to="/signin" className="register__link page__button">
          Войти
        </NavLink>
      </p>
      <InfoTooltip isSucces={isSucces} isOpen={isOpen} onClose={onClosePopup} />
    </>
  );
};
export default Register;
