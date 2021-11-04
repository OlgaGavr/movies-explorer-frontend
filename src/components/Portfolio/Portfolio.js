import React from 'react';
import './Portfolio.css';
import './__Title/Portfolio__Title.css';
import './__Link/Portfolio__Link.css';
import './__Text/Portfolio__Text.css';
import './__Arrow/Portfolio__Arrow.css';

function Portfolio() {
  return (
    <section className='Portfolio'>
      <h3 className='Portfolio__Title'>Портфолио</h3>
      
        <a className='Portfolio__Link' href='https://github.com/OlgaGavr' target="_blank" rel = "noreferrer">
          <p className='Portfolio__Text'>Статичный сайт</p>
          <p className='Portfolio__Arrow'>↗</p>
        </a>
        <a className='Portfolio__Link' href='https://github.com/OlgaGavr' target="_blank" rel = "noreferrer">
          <p className='Portfolio__Text'>Адаптивный сайт</p>
          <p className='Portfolio__Arrow'>↗</p>
        </a>
        <a className='Portfolio__Link' href='https://github.com/OlgaGavr' target="_blank" rel = "noreferrer">
          <p className='Portfolio__Text'>Одностраничное приложение</p>
          <p className='Portfolio__Arrow'>↗</p>
        </a>
          
    </section>
  )
}

export default Portfolio;