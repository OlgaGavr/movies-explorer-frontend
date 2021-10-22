import React from 'react';
import './Promo.css';
import './__top/Promo__top.css';
import './__link/Promo__link.css';
import '../Button/_Action/Button_Action_Signin.css';
import '../Button/Button.css';
import './__signup-link/Promo__signup-link.css';
import './__title/Promo__title.css';
import './__image/Promo__image.css';
import './__conteiner/Promo__conteiner.css'
import Logo from '../Logo/Logo.js';
import { Link } from 'react-router-dom';
import ornament from '../../images/text__COLOR_landing-logo.svg';

function Promo() {
  return (
    <section className='Promo'>
      <div className='Promo__top'>
        <Logo />
        <div>
          <Link className='Promo__Signup-Link' to='/signup'>Регистрация</Link>
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