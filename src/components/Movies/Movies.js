import React from 'react';
import './Movies.css';
import '../App/__Movies/App__Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm.js';

function Movies(props) {
  
  return (
    <section className="Movies App__Movies">
      <SearchForm isShort={props.isShort} onSearch={props.onSearch} onFilter={props.onFilter}/>
      { (props.isPreloader) ? <Preloader></Preloader> :
      <MoviesCardList
        typeSave={false}
        cards={props.movies}
      /> }
    </section>
  )
}

export default Movies;