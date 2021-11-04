import React from 'react';
import './SavedMovies.css';
import '../App/__SavedMovies/App__SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function SavedMovies(props) {
  return (
    <section className='SavedMovies App__SavedMovies'>
      <SearchForm isShort={false} ></SearchForm>
      <MoviesCardList
        typeSave={true}
        cards={props.movies}
      />
    </section>
  )
}

export default SavedMovies;