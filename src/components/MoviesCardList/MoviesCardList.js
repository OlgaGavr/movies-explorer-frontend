import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import More from '../More/More.js';

function MoviesCardList(props) {
  return (
    <section className="MoviesCardList">
      {props.cards.map((card) => (<MoviesCard typeSave={props.typeSave} key={card.id} card={card} />))}
      <More></More>
    </section>
  )
}

export default MoviesCardList;