import React from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import More from '../More/More.js';

function MoviesCardList({typeSave, cards, favMovies, isWord, onMore, countClick, onCardLike, onImageClick}) {
  const show = (typeSave) ? cards : cards.slice(0, countClick);
   return (
    <section className="MoviesCardList">
      {(cards.length > 0) ? 
      (show.map((card) => (<MoviesCard typeSave={typeSave} key={card.id} card={card} favMovies={favMovies} onCardLike={onCardLike} onImageClick={onImageClick} />)))
      : (<div></div>)}

      {((cards.length === 0) && ((isWord !== '')||(typeSave))) ? 
      (<span>Ничего не найдено</span>)
      : (cards.length>countClick && !typeSave) ? (<More onMore={onMore} movie={cards} countClick={countClick} ></More>): (<div></div>)}
    </section>
  )
}

export default MoviesCardList;