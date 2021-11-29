import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';

import './Profile.css';
import '../App/__Profile/App__Profile.css';
import './__Container/Profile__Container.css';
import './__Title/Profile__Title.css';
import './__Lines/Profile__Lines.css';
import './__Line/Profile__Line.css';
import './__Line-input/Profile__Line-input.css';
import './__Text/Profile__Text.css';
import './__Field/Profile__Field.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Edit.css';
import '../Button/_Inactive/Button_Inactive_Edit.css';
import './__Signout/Profile__Signout.css';
import './__Signout-link/Profile__Signout-link.css';

function Profile({onLogout, onUpdateUser, errorMessage, resetMessage}) {
 
  const currentUser = React.useContext(CurrentUserContext);

  const [values, setValues] = React.useState({ name: '', email: '' });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  
  React.useEffect(() => {
    if (currentUser !== undefined) {
      setValues({name: currentUser.name, email: currentUser.email})
    }
  }, [currentUser]);
  
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    resetMessage();
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.name || (values.name === currentUser.name && values.email === currentUser.email))
      return;

    onUpdateUser({
      name: values.name,
      email: values.email
    })
  }
  const classButton = (`Button Button_Action_Edit ${isValid&&(values.name !== currentUser.name || values.email !== currentUser.email) ? '' : 'Button_Inactive_Edit'}`);
  return (
    <article className='Profile App__Profile'>
      <form className='Profile__Container' onSubmit={handleSubmit} noValidate>  
        <h2 className='Profile__Title'>Привет, {currentUser.name}!</h2>
        <ul className='Profile__Lines'>
         <li className='Profile__Line'>
            <div className='Profile__Line-input'>
              <p className='Profile__Text'>Имя</p>
              <input type="text" className="Profile__Field" id="name-input"
                   minLength="2" maxLength="40" name="name"
                   pattern="[- a-zA-ZаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+" required
                   value={values.name} onChange={handleChange} />
            </div>
            <span className='Login__Error'>{errors.name}</span>
         </li>
         <li className='Profile__Line'>
            <div className='Profile__Line-input'>
              <p className='Profile__Text'>E-mail</p>
              <input type="email" className="Profile__Field" id="email-input"
                   name="email" required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                   value={values.email} onChange={handleChange} />
            </div>
            <span className='Login__Error'>{errors.email}</span>
         </li>
         <span className='Login__Error'>{errorMessage}</span>
        </ul>
        <button type="submit" className={classButton}>Редактировать</button>
        <div className='Profile__Signout'>
          <Link className='Profile__Signout-link' to='/' onClick={onLogout} >Выйти из аккаунта</Link>
        </div>
      </form>
    </article>
  )
}

export default Profile;