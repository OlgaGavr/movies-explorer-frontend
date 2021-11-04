import Logo from '../Logo/Logo.js';
import './Header.css';
import './__Links/Header__Links.css';
import './__Link/Header__Link.css';
import './__Link-active/Header__Link-active.css';
import './__Container/Header__Container.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Account.css';
import '../Button/_Action/Button_Action_Menu.css';
import './__Account/Header__Account.css';
import './__Account-image/Header__Account-image.css';

import profile from '../../images/profile.svg';
import { NavLink  } from 'react-router-dom';
function Header(props) {
  return (
    <header className="Header">
      <Logo />
      <div className='Header__Container'>
        <nav className='Header__Links'>
          <NavLink activeClassName='Header__Link-active' className='Header__Link' to='/movies'>Фильмы</NavLink >
          <NavLink activeClassName='Header__Link-active' className='Header__Link' to='/saved-movies'>Сохранённые фильмы</NavLink >
        </nav>
        <a className='Header__Account' href='/profile' rel="noopener">
          <img src={profile} alt='Аккаунт' className='Header__Account-image' />
        </a>
        {/* <button type="Button" className="Button Button_Action_Account" aria-label="аккаунт" /> */}
        <button type="Button" className="Button Button_Action_Menu" aria-label="меню" onClick={props.onMenu} />
      </div>
    </header>
  )
}

export default Header;