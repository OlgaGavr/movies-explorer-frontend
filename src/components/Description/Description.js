import React from 'react';
import './Description.css';
import './__Title/Description__Title.css';
import './__Text/Description__Text.css';
function Description(props) {
  return (
    <article className='Description'>
      <h3 className='Description__Title'>{props.title}</h3>
      <p className='Description__Text'>{props.text}</p>
    </article>
  )
}

export default Description;