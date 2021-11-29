import React from 'react';
import './SavedMovies.css';
import '../App/__SavedMovies/App__SavedMovies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

function SavedMovies(props) {
  return (
    <section className='SavedMovies App__SavedMovies'>
      <SearchForm typeSave={true} isShort={props.isShort} isWord={props.isWord} onSearch={props.onSearch} onFilter={props.onFilter} ></SearchForm>
      <MoviesCardList
        typeSave={true}
        cards={props.movies}
        favMovies={props.favMovies}
        isWord={props.isWord}
        onMore={props.onMore}
        countClick={props.countClick}
        onCardLike={props.onCardLike}
        onImageClick={props.onImageClick}
      />
    </section>
  )
}

export default SavedMovies;