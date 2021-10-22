import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

import SearchForm from '../SearchForm/SearchForm.js';

function Movies() {
  return (
    <section className="Movies">
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
    </section>
  )
}

export default Movies;