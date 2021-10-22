import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import More from '../More/More.js';

function MoviesCardList() {
  return (
    <section className="MoviesCardList">
      <MoviesCard></MoviesCard>
      <More></More>
    </section>
  )
}

export default MoviesCardList;