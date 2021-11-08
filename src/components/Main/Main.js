import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';

function Main() {
  return (
    <main className="Main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  )
}

export default Main;