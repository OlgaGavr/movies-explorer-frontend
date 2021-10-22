import React from 'react';
import './MoviesCard.css';
import './__Group/MoviesCard__Group.css';
import './__Info-group/MoviesCard__Info-group.css';
import './__Name/MoviesCard__Name.css';
import './__Duration/MoviesCard__Duration.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Like-active.css';
import './__Image/MoviesCard__Image.css';

function MoviesCard() {
  return (
    <article className="MoviesCard">
      <div className="MoviesCard__Group">
        <div className="MoviesCard__Info-group">
          <p className='MoviesCard__Name'>name</p>  
          <p className='MoviesCard__Duration'>duration</p>
        </div>
        <button type="button" className='Button Button_Action_Like-active' 
                  aria-label="поставить лайк" />
      </div>
      <img className="MoviesCard__Image" alt = 'переделать' src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' />
    </article>
  )
}

export default MoviesCard;