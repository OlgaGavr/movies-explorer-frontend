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

function MoviesCard({ typeSave, card, onCardLike, favMovies }) {
//  console.log('typeSave', typeSave, favMovies, card._id);
  // const cardId = (typeSave) ? card._id : card.id;
  const isLiked = (typeSave) ? true : favMovies.some(fav => fav.movieId === card.id);
  const delCard = (typeSave) ? card : favMovies.find(fav => fav.movieId===card.id);
 
//  console.log(isLiked, delCard);
  const cardLikeButtonClassName = (`Button ${typeSave ? 'Button_Action_Like-delete' : isLiked ? 'Button_Action_Like-active' : 'Button_Action_Like'}`);
  const cardLink = (typeSave) ? card.image : 'https://api.nomoreparties.co' + card.image.url;
  const trailerLink = (typeSave) ? card.trailer : card.trailerLink;

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins/60);
    const minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
  };
 
  return (
    <article className="MoviesCard">
      <div className="MoviesCard__Group">
        <div className="MoviesCard__Info-group">
          <p className='MoviesCard__Name'>{card.nameRU}</p>  
          <p className='MoviesCard__Duration'>{getTimeFromMins(card.duration)}</p>
        </div>
        <button type="button" className={cardLikeButtonClassName} aria-label="сохранить в избранное" onClick={() => onCardLike(card, isLiked, delCard)} />
      </div>
      <a href={trailerLink} target="_blank" rel = "noreferrer">
        <img className="MoviesCard__Image" alt = {card.nameRU} src = {cardLink} />
      </a>
    </article>
  )
}

export default MoviesCard;