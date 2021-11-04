import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './MenuPopup.css';
import './_Opened/MenuPopup_Opened.css';
import './__Container/MenuPopup__Container.css';
import './__Lines/MenuPopup__Lines.css';
import './__Line/MenuPopup__Line.css';
import './__Link/MenuPopup__Link.css';
import './__Link-active/MenuPopup__Link-active.css';
import './__Account/MenuPopup__Account.css';
import './__Account-image/MenuPopup__Account-image.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Close.css';

import profile from '../../images/profile.svg';

function MenuPopup({ isOpen, closePopup }) {
    return (
      <article className={`MenuPopup ${isOpen ? 'MenuPopup_Opened' : ' '}`}>
        <div className='MenuPopup__Container'>
          <nav>
            <ul  className='MenuPopup__Lines'>
              <li className='MenuPopup__Line'>
                <NavLink className='MenuPopup__Link' to='/' onClick={closePopup}>Главная</NavLink>
              </li>
              <li className='MenuPopup__Line'>
                <NavLink activeClassName='MenuPopup__Link-active' className='MenuPopup__Link' to='/movies' onClick={closePopup}>Фильмы</NavLink>
              </li>
              <li className='MenuPopup__Line'>
                <NavLink activeClassName='MenuPopup__Link-active' className='MenuPopup__Link' to='/saved-movies' onClick={closePopup}>Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </nav>
          <Link className='MenuPopup__Account' to='/profile' onClick={closePopup}>
            <img src={profile} alt='Аккаунт' className='MenuPopup__Account-image' />
          </Link>
          <button type='button' className='Button Button_Action_Close'
            aria-label="закрыть" onClick={closePopup} />
        </div>
      </article>
    )
  }
  
  export default MenuPopup;