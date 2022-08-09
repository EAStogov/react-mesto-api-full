import headerLogo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';

function Header({isLoggedIn, userEmail, authAction, route, isAuthShown, toggleVisibility, unSign}) {
  function handleClick() {
    isAuthShown && toggleVisibility();
    unSign && unSign();
  }
  return (
      <header className={`header ${isLoggedIn && 'header_column'}`}>
        <div className='header__container'>
          <img src={headerLogo} alt="Место — Россия" className="header__logo" />
          <button onClick={toggleVisibility} className={`page__button header__burger ${isLoggedIn && 'header__burger_active'} ${isAuthShown && 'header__burger_cross-icon'}`}></button>
        </div>
        <div className={`header__auth ${isAuthShown && isLoggedIn && 'header__auth_column'} ${!isAuthShown && isLoggedIn && 'header__auth_hidden'}`}>
          {isLoggedIn && 
          <p className='header__email'>{userEmail}</p>}
          <NavLink to={route} onClick={handleClick} type='text' className='header__link page__button'>{authAction}</NavLink>
        </div>
      </header>
  );
}

export default Header;