import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../Logo/Logo.js';

import '../Login/Login.css';
import '../App/__Login/App__Login.css';
import '../Login/__Title/Login__Title.css';
import '../Login/__Form/Login__Form.css';
import '../Register/__Lines/Register__Lines.css';
import '../Login/__Line/Login__Line.css';
import '../Login/__Text/Login__Text.css';
import '../Login/__Field/Login__Field.css';
import '../Login/__Error/Login__Error.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Login.css';
import '../Login/__Signin/Login__Signin.css';
import '../Login/__Signin-text/Login__Signin-text.css';
import '../Login/__Signin-link/Login__Signin-link.css';

function Register({ onRegister, errorMessage, resetMessage }) {
  const [values, setValues] = React.useState({ email: '', password: '', name: '' });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const classButton = (`Button Button_Action_Login ${isValid ? '' : 'Button_Inactive'}`);
    
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
    onRegister(values)
      .catch(err => {
        console.log(err)});
  }
    
  return (
    <div className='Login App__Login'>
      <Logo />
      <h2 className='Login__Title'>Добро пожаловать!</h2>
      <form onSubmit={handleSubmit} className='Login__Form' noValidate>
        <div className='Register__Lines'>
          <div className='Login__Line'>
            <p className='Login__Text'>Имя</p>   
            <input type="text" id="name" name="name" className='Login__Field'
              minLength="2" maxLength="40" 
              pattern="[- a-zA-ZаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+" required 
              value={values.name} onChange={handleChange} />
            <span className='Login__Error'>{errors.name}</span>
          </div>
          <div className='Login__Line'>
            <p className='Login__Text'>E-mail</p>    
            <input type="email" id="email" name="email" className='Login__Field' required 
        //    pattern="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
            value={values.email} onChange={handleChange} />
            <span className='Login__Error'>{errors.email}</span>
          </div>
          <div className='Login__Line'>
            <p className='Login__Text'>Пароль</p>   
            <input type="password" id="password" name="password" className='Login__Field' minLength="6" required 
            value={values.password} onChange={handleChange} />
            <span className='Login__Error'>{errors.password}</span>
          </div>
          <span className='Login__Error'>{errorMessage}</span>
        </div>
        <button type="submit" className={classButton} >Зарегистрироваться</button>
      </form>
      <div className='Login__Signin'>
        <p className='Login__Signin-text'>Уже зарегистрированы? </p>
        <Link className='Login__Signin-link' to='/signin'>Войти</Link>
      </div>
    </div>
  )
}

export default Register;