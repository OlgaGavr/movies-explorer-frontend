import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';
import './__Title/Footer__Title.css';
import './__Container/Footer__Container.css';
import './__Copyright/Footer__Copyright.css';
import './__Links/Footer__Links.css';
import './__Link/Footer__Link.css';

function Footer() {
  const location=useLocation();
  return (
    <footer className="Footer">
       { ((location.pathname ==='/' ) || (location.pathname ==='/movies' ) || (location.pathname ==='/saved-movies' )) ? 
      (<div>
        <h2 className="Footer__Title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className='Footer__Container'>
          <p className="Footer__Copyright">&copy; {new Date().getFullYear()}</p>
          <nav className="Footer__Links">
            <a className="Footer__Link" href="https://practicum.yandex.ru/" target="_blank" rel = "noreferrer">Яндекс.Практикум</a>
            <a className="Footer__Link" href="https://github.com/" target="_blank" rel = "noreferrer">Github</a>
            <a className="Footer__Link" href="https://www.facebook.com/" target="_blank" rel = "noreferrer">Facebook</a>
          </nav>
        
        </div>
      </div>) : (<div></div>) }
    </footer>
  )
}
  
export default Footer;