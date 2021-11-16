import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

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

import * as MainApi from '../../utils/MainApi.js';
import * as MoviesApi from '../../utils/MoviesApi.js';
import initialCards from '../../utils/InicialCards.js';  

function App() {
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    name: '',
    _id: '',
  });

  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [isShortFavMovie, setIsShortFavMovie] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  
  // const [likeMovie, setLikeMovie] = React.useState([]);
  const history = useHistory();

  React.useEffect((keyWord) => {
    const films = localStorage.getItem('films');
    console.log('useEffect', keyWord, isShortMovie );
    setMovies(JSON.parse(films));
    searchMovie( keyWord, isShortMovie);
  }, [isShortMovie]);

  function register({email, password, name}) {
    return MainApi
      .register({email, password, name})
      .then((data) => {
        login({email, password});
      })
      .catch(() => {
        // вывести ошибку
      })
  }
  
  function login(data) {
    
    return MainApi
      .authorize(data)
      .then((data) => {  // получила токен
        console.log('login', data);
        localStorage.setItem('jwt', data.token);
        tokenCheck();
      })
      .catch(() => {
         // вывести ошибку
      })
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return
    }
    return MainApi
      .getContent(jwt)
      .then((data) => {
        setUserInfo({ 
          email: data.email,
          name: data.name,
         _id: data._id,
        });
        setLoggedIn(true);
        history.push('/movies');
      })
     .catch(err => console.log(err));
  }
  
  function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('films');
    setLoggedIn(false);
    history.push('/signin');
  }
 
  function getAllMovies(keyWord) {
    setIsPreloader(true);
    const films = localStorage.getItem('films');
    if (!films) {
      console.log('из БД');
      MoviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem('films', JSON.stringify(movies));
          setMovies(movies);
          searchMovie( keyWord, isShortMovie);
        })
        .then(() => setIsPreloader(false))
        .catch(() => console.log(`Ошибка загрузки данных`));
    } else {
      console.log('localStorige');
      setMovies(JSON.parse(films));
      searchMovie( keyWord, isShortMovie);
      setIsPreloader(false);
    }
  };

  function searchMovie(term, isShort){
    setMovies((state) => state.filter((c) => c.description.includes(term) && ((isShort && (c.duration <= 50)) || (!isShort && (c.duration > 50)))));
    //  setMovies((state) => state.filter((c) => !isShort && (c.duration > 45)))
  }

  function handleMenuClick() {
    setIsMenuPopupOpen(true);
  }

  function closeMenuPopup() {
    setIsMenuPopupOpen(false);
  }
  
  function handleFilterClick() {
    setIsShortMovie(!isShortMovie);
  }

  function handleFavFilterClick() {
    setIsShortFavMovie(!isShortFavMovie);
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/signin">
          <Login onLogin={login} />
        </Route>
        <Route path="/signup">
          <Register onRegister={register} />
        </Route>
        <Route path="/movies">
          <Header loggedIn = {loggedIn} onMenu={handleMenuClick} />
          <Movies isPreloader={isPreloader} movies={movies} isShort={isShortMovie} onSearch={getAllMovies} onFilter={handleFilterClick} />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header loggedIn = {loggedIn} onMenu={handleMenuClick} />
          <SavedMovies isPreloader={isPreloader} movies={initialCards} isShort={isShortFavMovie} onSearch={getAllMovies} onFilter={handleFavFilterClick} />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header loggedIn = {loggedIn} onMenu={handleMenuClick} />
          <Profile onLogout={logout} />
        </Route>
        <Route exact path="/">
          <Header loggedIn = {loggedIn} onMenu={handleMenuClick} />
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
