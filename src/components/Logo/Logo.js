import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';
import './__Image/Logo__Image.css';
import logo from '../../images/logo.svg';

function Logo() {
  return (
    <Link className='Logo' to='/'>
      <img src={logo} alt='Логотип' className='Logo__Image' />
    </Link>
  )
}
    
export default Logo;