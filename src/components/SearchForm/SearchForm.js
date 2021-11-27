import React from 'react';
import './SearchForm.css';
import './__Container/SearchForm__Container.css';
import './__Container-error/SearchForm__Container-error.css';
import './__Field/SearchForm__Field.css';
import '../Button/_Action/Button_Action_Search.css';
import './__Error/SearchForm__Error.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

function SearchForm({ typeSave, isShort, isWord, onSearch, onFilter }) {
  
  const [keyWord, setKeyWord] = React.useState({ word: '' });
  const [errorSearh, setErrorSearh] = React.useState('');
  
  React.useEffect(() => {
    if (isWord !== undefined) {
      setKeyWord({word: isWord})
    }
  }, []); 
  
  function handleChange(e) {
    const { name, value } = e.target;
    setKeyWord({
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (keyWord.word === '' && !typeSave)
    {
      setErrorSearh('Нужно ввести ключевое слово');
      return
    }
    setErrorSearh('');
    onSearch(keyWord.word)
  }
    
  return (
    <form onSubmit={handleSubmit} className="SearchForm" noValidate>
      <div className='SearchForm__Container-error'>
        <div className="SearchForm__Container">
          <input type="text" id="word" name="word" className="SearchForm__Field" placeholder="Фильм" required 
            value={keyWord.word} onChange={handleChange} />
          <button type="submit" className="Button Button_Action_Search">Поиск</button>  
        </div>
        <span className='SearchForm__Error'>{errorSearh}</span>
      </div>
      <FilterCheckbox isShort={isShort} onFilter={onFilter} ></FilterCheckbox>
    </form>
  )
}

export default SearchForm;