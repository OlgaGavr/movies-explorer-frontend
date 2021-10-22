import Logo from '../Logo/Logo.js';
import './Header.css';
import './__Links/Header__Links.css';
import './__Link/Header__Link.css';
import './__Container/Header__Container.css';
import '../Button/_Action/Button_Action_Account.css';
import '../Button/_Action/Button_Action_Menu.css';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header className="Header">
      <Logo />
      <div className='Header__Container'>
        <div className='Header__Links'>
          <Link className='Header__Link' to='/signup'>Фильмы</Link>
          <Link className='Header__Link' to='/signup'>Сохранённые фильмы</Link>
        </div>
        <button type="Button" className="Button Button_Action_Account" aria-label="аккаунт" />
        <button type="Button" className="Button Button_Action_Menu" aria-label="меню" />
      </div>
    </header>
  )
}

export default Header;