import Logo from '../Logo/Logo.js';
import './Header.css';
import './_Thema/Header_Thema_Main.css';
import './__Links/Header__Links.css';
import './__Link/Header__Link.css';
import './__Link-active/Header__Link-active.css';
import './__Container/Header__Container.css';
import './__Signup-link/Header__Signup-link.css';
import './__Signin-link/Header__Signin-link.css';
import './__Signin/Header__Signin.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Menu.css';
import './__Account/Header__Account.css';
import './__Account-image/Header__Account-image.css';

import profile from '../../images/profile.svg';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Header({ loggedIn, onMenu }) {
  const location=useLocation();
  const HeaderClassName = (`Header ${location.pathname==='/' ? 'Header_Thema_Main' : '' }`);
  
  return (
    <header className={HeaderClassName}>
      { (loggedIn || (location.pathname ==='/' )) ? <Logo /> : <div></div>}
      { (loggedIn) ? 
        (
        <div className='Header__Container'>
          <nav className='Header__Links'>
            <NavLink activeClassName='Header__Link-active' className='Header__Link' to='/movies'>Фильмы</NavLink >
            <NavLink activeClassName='Header__Link-active' className='Header__Link' to='/saved-movies'>Сохранённые фильмы</NavLink >
          </nav>
          <Link className='Header__Account' to='/profile' rel="noopener">
            <img src={profile} alt='Аккаунт' className='Header__Account-image' />
          </Link>
        
          <button type="Button" className="Button Button_Action_Menu" aria-label="меню" onClick={onMenu} />
        </div>) : (location.pathname ==='/' ) ?
        (<div className='Header__Container'>
          <Link className='Header__Signup-link' to='/signup'>Регистрация</Link>
          <div className='Header__Signin'>
            <Link className='Header__Signin-link' to='/signin'>Войти</Link>
          </div>
        </div>) : (<div></div>) }
    </header>
  )
}

export default Header;