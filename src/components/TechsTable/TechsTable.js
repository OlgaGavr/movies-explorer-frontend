import React from 'react';
import './TechsTable.css';
import './__Cell/TechsTable__Cell.css';
function Timetable() {
  return (
    <article className='TechsTable'>
      <p className="TechsTable__Cell">HTML</p>
      <p className="TechsTable__Cell">CSS</p>
      <p className="TechsTable__Cell">JS</p>
      <p className="TechsTable__Cell">React</p>
      <p className="TechsTable__Cell">Git</p>
      <p className="TechsTable__Cell">Express.js</p>
      <p className="TechsTable__Cell">mongoDB</p>
    </article>
  )
}

export default Timetable;