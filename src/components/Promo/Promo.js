import React from 'react';
import './Promo.css';
import '../Button/_Action/Button_Action_Signin.css';
import '../Button/Button.css';
import './__Title/Promo__Title.css';
import './__Image/Promo__Image.css';
import './__Conteiner/Promo__Conteiner.css';

import ornament from '../../images/text__COLOR_landing-logo.svg';

function Promo() {
  return (
    <section className='Promo'>
      <h1 className='Promo__Title'>Учебный проект студента факультета Веб-разработки.</h1>
      <div className='Promo__Conteiner'>
        <img className="Promo__Image" src={ornament} alt="Украшение" />
      </div>
    </section>
  )
}

export default Promo;