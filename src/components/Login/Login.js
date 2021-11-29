import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo.js';

import '../Login/Login.css';
import '../App/__Login/App__Login.css';
import '../Login/__Title/Login__Title.css';
import '../Login/__Form/Login__Form.css';
import '../Login/__Lines/Login__Lines.css';
import '../Login/__Line/Login__Line.css';
import '../Login/__Text/Login__Text.css';
import '../Login/__Field/Login__Field.css';
import '../Login/__Error/Login__Error.css';
import '../Button/Button.css';
import '../Button/_Action/Button_Action_Login.css';
import '../Login/__Signin/Login__Signin.css';
import '../Login/__Signin-text/Login__Signin-text.css';
import '../Login/__Signin-link/Login__Signin-link.css';

function Login({ onLogin, errorMessage, resetMessage }) {
  const [values, setValues] = React.useState({ email: '', password: '' });
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
    if (!values.email || !values.password)
      return;
    
    onLogin(values)
      .catch(err => console.log(err));
  }

  return (
    <div className='Login App__Login'>
      <Logo />
      <h2 className='Login__Title'>Рады видеть!</h2>
      <form onSubmit={handleSubmit} className='Login__Form' noValidate>
        <div className='Login__Lines'>
          <div className='Login__Line'>
            <p className='Login__Text'>E-mail</p> 
            <input type="email" id="email" name="email" className='Login__Field' required
            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
        <button type="submit" className={classButton}>Войти</button>
      </form>
      <div className='Login__Signin'>
        <p className='Login__Signin-text'>Ещё не зарегистрированы?</p>
        <Link className='Login__Signin-link' to='/signup'>Регистрация</Link>
      </div>
    </div>
  )
}

export default Login;