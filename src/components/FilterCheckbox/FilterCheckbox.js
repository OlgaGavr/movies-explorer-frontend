import React from 'react';
import './FilterCheckbox.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Filter.css';
import '../Button/_Action/Button_Action_Filter-active.css';
import '../FilterCheckbox/__Text/FilterCheckbox__Text.css';

function FilterCheckbox({isShort, onFilter}) {
  return (
    <div className="FilterCheckbox">
      <button type="Button" onClick={onFilter} aria-label="короткометражки"
              className={`Button ${isShort ? 'Button_Action_Filter-active' : 'Button_Action_Filter'}`} />
      <p className='FilterCheckbox__Text'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;