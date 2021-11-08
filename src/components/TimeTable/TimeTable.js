import React from 'react';
import './TimeTable.css';
import './__Title-back/TimeTable__Title-back.css';
import './__Title-front/TimeTable__Title-front.css';
import './__Back/TimeTable__Back.css';
import './__Front/TimeTable__Front.css';
function Timetable() {
  return (
    <article className='TimeTable'>
      <h4 className="TimeTable__Title-back">1 неделя</h4>
      <p className='TimeTable__Back'>Back-end</p>
      <h4 className="TimeTable__Title-front">4 недели</h4>
      <p className='TimeTable__Front'>Front-end</p>
    </article>
  )
}

export default Timetable;