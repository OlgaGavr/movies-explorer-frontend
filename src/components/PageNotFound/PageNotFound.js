import React from 'react';
import { useHistory } from 'react-router-dom';
import './PageNotFound.css';
import '../App/__PageNotFound/App__PageNotFound.css';
import './__Title/PageNotFound__Title.css';
import './__Text/PageNotFound__Text.css';
import './__Back-link/PageNotFound__Back-link.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Back.css'; 

function PageNotFound() {
  const history = useHistory(); 

  return (
    <div className='PageNotFound App__PageNotFound'>
      <h2 className='PageNotFound__Title'>404</h2>
      <p className='PageNotFound__Text'>Страница не найдена</p> 
      <button className="Button Button_Action_Back" onClick={() => history.goBack()}>Назад</button>
      {/* <Link className='PageNotFound__Back-link' to='/login'>Назад</Link> */}
    </div>

  )
}

export default PageNotFound;