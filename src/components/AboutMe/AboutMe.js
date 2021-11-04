import React from 'react';

import './AboutMe.css';
import './__All/AboutMe__All.css';
import './__Description/AboutMe__Description.css';
import './__Foto/AboutMe__Foto.css';
import './__Info/AboutMe__Info.css';
import './__Title/AboutMe__Title.css';
import './__SubTitle/AboutMe__SubTitle.css';
import './__Text/AboutMe__Text.css';
import './__Link/AboutMe__Link.css';

import Title from '../Title/Title.js';
import foto from '../../images/foto.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className='AboutMe'>
      <Title title='Студент' />
      <article className='AboutMe__All'>
        <div className='AboutMe__Info'>
          <div className='AboutMe__Description'>
            <h3 className='AboutMe__Title'>Ольга</h3>
            <h4 className='AboutMe__SubTitle'>Фронтенд-разработчик</h4>
            <p className='AboutMe__Text'>Я родилась в Нижнем Новгороде, сейчас живу в Испании, закончила факультет ВМК ННГУ. 
              После окончания университета работала программистом. Работа была связана с обработкой БД. Потом работала учителем.
              Сейчас опять хочу вернуться к программированию.</p>
          </div>
          <div className='AboutMe__Links'>
            <a className='AboutMe__Link' href='https://www.facebook.com/profile.php?id=100022367388832' target="_blank" rel = "noreferrer">Facebook</a>
            <a className='AboutMe__Link' href='https://github.com/OlgaGavr' target="_blank" rel = "noreferrer">Github</a>
          </div>  
        </div>
        <img className='AboutMe__Foto' src={foto} alt="Фотография" />
      </article>
      <Portfolio />
    </section>
  )
}

export default AboutMe;