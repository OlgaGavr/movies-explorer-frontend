import React from 'react';

import './Footer.css';
import './__Title/Footer__Title.css';
import './__Container/Footer__Container.css';
import './__Copyright/Footer__Copyright.css';
import './__Links/Footer__Links.css';
import './__Link/Footer__Link.css';

function Footer() {
  return (
    <footer className="Footer">
      <h2 className="Footer__Title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div class='Footer__Container'>
        <p className="Footer__Copyright">&copy; {new Date().getFullYear()}</p>
        <nav className="Footer__Links">
          <a className="Footer__Link" href="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</a>
          <a className="Footer__Link" href="https://github.com/" target="_blank">Github</a>
          <a className="Footer__Link" href="https://www.facebook.com/" target="_blank">Facebook</a>
        </nav>
        
      </div>
    </footer>
  )
}
  
export default Footer;