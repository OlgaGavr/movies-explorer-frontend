import React from 'react';
import './FilterCheckbox.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Filter.css';
import '../FilterCheckbox/__Text/FilterCheckbox__Text.css';

function FilterCheckbox() {
  return (
    <div className="FilterCheckbox">
      <button type="Button" className="Button Button_Action_Filter" aria-label="короткометражки" />
      <p className='FilterCheckbox__Text'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;