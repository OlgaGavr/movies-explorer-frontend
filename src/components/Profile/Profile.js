import React from 'react';
import { Link } from 'react-router-dom';

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
import './__Signout/Profile__Signout.css';
import './__Signout-link/Profile__Signout-link.css';

function Profile() {
  return (
    <article className='Profile App__Profile'>
      <div className='Profile__Container'>  
        <h2 className='Profile__Title'>Привет, Виталий!</h2>
        <ul className='Profile__Lines'>
        <li className='Profile__Line'>
            <div className='Profile__Line-input'>
            <p className='Profile__Text'>Имя</p>
            <input type="text" className="Profile__Field Profile__Field_Text_Name" id="name-input"
                    minLength="2" maxLength="40" name="name" required />
                {/*   value={name} onChange={handleChangeName} /> */}
            </div>
        </li>
        <li className='Profile__Line'>
            <div className='Profile__Line-input'>
            <p className='Profile__Text'>E-mail</p>
            <input type="text" className="Profile__Field Profile__Field_Text_Email" id="about-input"
                minLength="2" maxLength="200" name="about" required />
            {/* value={description} onChange={handleChangeDescription} /> */}
            </div>
        </li>
        </ul>
        <button type="submit" className="Button Button_Action_Edit">Редактировать</button>
        <div className='Profile__Signout'>
          <Link className='Profile__Signout-link' to='/'>Выйти из аккаунта</Link>
        </div>
      </div>
    </article>
  )
}

export default Profile;