import React from 'react';
import './Promo.css';
import './__Top/Promo__Top.css';
import './__Link/Promo__Link.css';
import '../Button/_Action/Button_Action_Signin.css';
import '../Button/Button.css';
import './__Signup-link/Promo__Signup-link.css';
import './__Signin-link/Promo__Signin-link.css';
import './__Title/Promo__Title.css';
import './__Image/Promo__Image.css';
import './__Conteiner/Promo__Conteiner.css';

import Logo from '../Logo/Logo.js';
import { Link } from 'react-router-dom';
import ornament from '../../images/text__COLOR_landing-logo.svg';

function Promo() {
  return (
    <section className='Promo'>
      <div className='Promo__top'>
        <Logo />
        <div>
          <Link className='Promo__Signup-link' to='/signup'>Регистрация</Link>
          {/* <Link className='Button Button_Action_Signin' to='/signin'>Войти</Link> */}
          <button className="Button Button_Action_Signin" aria-label="войти">Войти</button>
        </div>
      </div>
      <h1 className='Promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <div className='Promo__conteiner'>
        <img className="Promo__image" src={ornament} alt="Украшение" />
      </div>
    </section>
  )
}

export default Promo;