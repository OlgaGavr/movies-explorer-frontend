import React from 'react';
import './SearchForm.css';
import './__Container/SearchForm__Container.css';
import './__Field/SearchForm__Field.css';
import '../Button/_Action/Button_Action_Search.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

function SearchForm() {
  return (
    <section className="SearchForm">
      <div className="SearchForm__Container">
        <input type="text" id="name" name="name" className="SearchForm__Field" placeholder="Фильм" required />
        <button type="submit" className="Button Button_Action_Search">Поиск</button>  
      </div>
      <FilterCheckbox></FilterCheckbox>
    </section>
  )
}

export default SearchForm;