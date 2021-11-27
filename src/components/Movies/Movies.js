import React from 'react';

import './Movies.css';
import '../App/__Movies/App__Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies(props) {
  return (
    <section className="Movies App__Movies">
      
      <SearchForm typeSave={false} isShort={props.isShort} isWord={props.isWord} onSearch={props.onSearch} onFilter={props.onFilter}/>
      { (props.isPreloader) ? 
      <Preloader></Preloader> :
      <MoviesCardList
        typeSave={false}
        cards={props.movies}
        favMovies={props.favMovies}
        isWord={props.isWord}
        onMore={props.onMore}
        countClick={props.countClick}
        onCardLike={props.onCardLike}
      /> }
    </section>
  )
}

export default Movies;