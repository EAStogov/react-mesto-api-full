const Form = ({name, title, onSubmit, submitButtonText, children, isForAuth, isForSignUp}) => {
  return (
    <div className={`form__container ${isForAuth && 'form__container_auth'} ${isForSignUp && 'form__container_sign-up'}`}>
      <h2 className={`form__heading ${isForAuth && 'form__heading_auth'} ${isForSignUp && 'form__heading_hidden'}`}>{title}</h2>
      <form
        action="url"
        onSubmit={onSubmit}
        name={`form__form-${name}`}
        className={`form__body form__body_fill_${name}`}>
        {children}
        <button type="submit" className={`form__submit page__button ${isForAuth && 'form__submit_auth'} ${isForSignUp && 'form__submit_hidden'}`}>
          {submitButtonText}
        </button>
      </form>
    </div>
  )
}

export default Form;