import React from 'react';
import { Link } from 'react-router-dom';

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

function Register({ onRegister }) {
  const [registerData, setRegisterData] = React.useState({ email: '', password: '', name: '' })

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(registerData)
      .catch(err => console.log(err));
  }
    
  return (
    <div className='Login App__Login'>
      <Logo />
      <h2 className='Login__Title'>Добро пожаловать!</h2>
      <form onSubmit={handleSubmit} className='Login__Form'>
        <div className='Register__Lines'>
          <div className='Login__Line'>
            <p className='Login__Text'>Имя</p>   
            <input type="text" id="name" name="name" className='Login__Field' required 
             value={registerData.name} onChange={handleChange} />
          </div>
          <div className='Login__Line'>
            <p className='Login__Text'>E-mail</p>    
            <input type="email" id="email" name="email" className='Login__Field' required 
            value={registerData.email} onChange={handleChange} />
            </div>
          <div className='Login__Line'>
            <p className='Login__Text'>Пароль</p>   
            <input type="password" id="password" name="password" className='Login__Field' required 
            value={registerData.password} onChange={handleChange} />
          </div>
          <span className='Login__Error'>Ошибка</span>
        </div>
        <button type="submit" className="Button Button_Action_Login">Зарегистрироваться</button>
      </form>
      <div className='Login__Signin'>
        <p className='Login__Signin-text'>Уже зарегистрированы? </p>
        <Link className='Login__Signin-link' to='/signin'>Войти</Link>
      </div>
    </div>


  )
}

export default Register;