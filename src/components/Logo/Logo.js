import React from 'react';
import './Logo.css';
import './__Image/Logo__Image.css';
import logo from '../../images/logo.svg';

function Logo() {
  return (
    <a className='Logo' href="#" target="_blank" rel="noopener">
        <img src={logo} alt='Логотип' className='Logo_Image' />
    </a>
  )
}
    
export default Logo;