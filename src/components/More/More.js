import React from 'react';
import './More.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_More.css';

function More({onMore}) {
  function handleSubmit(e) {
    e.preventDefault();
    onMore();
  }

  return (
    <section className="More">
      <button type="submit" className="Button Button_Action_More" onClick={handleSubmit}>Ещё</button>     
    </section>
  )
}

export default More;