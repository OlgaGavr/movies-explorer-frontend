import React from 'react';
import { Route, Switch } from 'react-router-dom';

import "./App.css";
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import MenuPopup from '../MenuPopup/MenuPopup.js';

import initialCards from '../../utils/InicialCards.js';

function App() {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  
  function handleMenuClick() {
    setIsMenuPopupOpen(true);
  }

  function closeMenuPopup() {
    setIsMenuPopupOpen(false);
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/movies">
          <Header
            onMenu={handleMenuClick}
          />
          <Movies 
            movies={initialCards}
          />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header 
            onMenu={handleMenuClick}
          />
          <SavedMovies 
            movies={initialCards}
          />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header 
            onMenu={handleMenuClick}
          />
          <Profile />
        </Route>
        <Route exact path="/">
          <Main />
          <Footer />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

      <MenuPopup isOpen={isMenuPopupOpen} closePopup={closeMenuPopup} /> 
    </div>
  );
}

export default App;
