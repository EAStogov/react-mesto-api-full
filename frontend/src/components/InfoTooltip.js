import succesLogo from '../images/succes.svg';
import failLogo from '../images/fail.svg';
import PopupWithForm from './PopupWithForm';

const InfoTooltip = ({isSucces, isOpen, onClose}) => {
  function closePopup() {
    onClose();
  }
  return (
    <PopupWithForm isOpen={isOpen} name='infoToolTip' onClose={closePopup} isForSignUp={true}>
        <img src={isSucces ? succesLogo : failLogo } alt={isSucces ? 'Успешно' : 'Ошибка!'} className={'popup__sign-up-result'} />
        <p className='popup__sign-up-heading'>{ isSucces ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
    </PopupWithForm>
  )
}

export default InfoTooltip;