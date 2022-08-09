import Form from "./Form";
function PopupWithForm({
  name,
  title,
  isOpen,
  children,
  submitButtonText,
  onClose,
  onSubmit,
  isForAuth,
  isForSignUp
}) {
  return (
    <section
      id={`${name}-popup`}
      className={`popup ${isOpen  && "popup_opened"}`}>
        <Form name={name} title={title} onSubmit={onSubmit} isForAuth={isForAuth} submitButtonText={submitButtonText} onClose={onClose} isForSignUp={isForSignUp}>
          {children}
        <button
          aria-label
          type="button"
          className="popup__close page__button"
          onClick={onClose}
          style={isForAuth && {display: "none"}}>
        </button>
        </Form>
    </section>
  );
}

export default PopupWithForm;
