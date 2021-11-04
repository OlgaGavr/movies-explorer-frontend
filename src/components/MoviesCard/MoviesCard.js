import React from 'react';
import './MoviesCard.css';
import './__Group/MoviesCard__Group.css';
import './__Info-group/MoviesCard__Info-group.css';
import './__Name/MoviesCard__Name.css';
import './__Duration/MoviesCard__Duration.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Like-active.css';
import '../Button/_Action/Button_Action_Like.css';
import '../Button/_Action/Button_Action_Like-delete.css';
import './__Image/MoviesCard__Image.css';

function MoviesCard({ typeSave, card }) {
  const cardLikeButtonClassName = (`button ${typeSave ? 'Button_Action_Like-delete' : card.isLike ? 'Button_Action_Like-active' : 'Button_Action_Like'}`);

  return (
    <article className="MoviesCard">
      <div className="MoviesCard__Group">
        <div className="MoviesCard__Info-group">
          <p className='MoviesCard__Name'>{card.nameRU}</p>  
          <p className='MoviesCard__Duration'>{card.duration}</p>
        </div>
        {/* <button type="button" className={`Button ${card.isLike ? 'Button_Action_Like-active' : 'Button_Action_Like'}`}  */}
        <button type="button" className={cardLikeButtonClassName} 
                  aria-label="сохранить в избранное" />
      </div>
      <img className="MoviesCard__Image" alt = {card.nameRU} src = {card.link} />
    </article>
  )
}

export default MoviesCard;