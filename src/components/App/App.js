import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

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
import InfoTolltip from '../InfoTolltip/InfoTolltip.js';

import * as MainApi from '../../utils/MainApi.js';
import * as MoviesApi from '../../utils/MoviesApi.js';

function App() {
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurentUser] = React.useState({});
  const [userInfo, setUserInfo] = React.useState({
    email: '',
    name: '',
    _id: '',
  });
  
  const [keyWordMovies, setKeyWordMovies] = React.useState('');
  const [keyWordFavMovies, setKeyWordFavMovies] = React.useState('');

  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [isShortFavMovie, setIsShortFavMovie] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]);
  const [favMovies, setFavMovies] = React.useState([]);

  const [countClick, setCountClick] = React.useState(7);
  const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();
  const pathName=useLocation();
  React.useEffect(() => {
    if (loggedIn) {
      MainApi.getAllData()
        .then((data) => {
          setCurentUser(data[0].data);
          setFavMovies(data[1].data);
    //      history.push('/movies');
        })
    }
  }, [loggedIn, history]);
  
  React.useEffect(() => {
    MainApi.getUser()
      .then((userData) => {
        setCurentUser(userData);
      })
      .catch(() => console.log('Ошибка загрузки данных'));
  }, []);

  React.useEffect(() => {
    MainApi.getMovies()
      .then((movies) => {
        setFavMovies(movies.data);
      })
      .catch(() => console.log(`Ошибка загрузки данных`));
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (keyWordMovies==='') return;
    const films = localStorage.getItem('films');
    setAllMovies(JSON.parse(films));
    searchMovie(keyWordMovies);
  }, [isShortMovie]);

  React.useEffect(() => {
    MainApi.getMovies()
      .then((movies) => {
        setFavMovies(movies.data);
      })
      .then(() => {
        searchFavMovie(keyWordFavMovies);
      })
      .catch(() => console.log(`Ошибка загрузки данных`));
  }, [isShortFavMovie]);
  
  
  function register({email, password, name}) {
    return MainApi
      .register({email, password, name})
      .then((res) => {
        if (res.message) {
          throw res
        } else {
          return res
        }
      })
      .then((res) => {
        login({email, password});
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
  }
  
  function login(data) {
    return MainApi
      .authorize(data)
      .then((res) => {  // получила токен
        if (res.message) {
          throw res
        } else {
          return res
        }
      })
      .then((res) => {
        localStorage.setItem('jwt', res.token);  // записала токен в localStorage
        tokenCheck();
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');  //получила токен из localStorage
    if (!jwt) {
      return
    }
    return MainApi
      .getContent(jwt)
      .then((res) => {
        if (res.message) {
          throw res
        } else {
          return res
        }
      })
      .then((res) => {
        setUserInfo({ 
          email: res.email,
          name: res.name,
          _id: res._id,
        });
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }
  
  function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('films');
    setLoggedIn(false);
    setAllMovies('');
    setFavMovies('');
    history.push('/signin');
  }
  
  function getAllMovies(keyWord) {
    setIsPreloader(true);
    setKeyWordMovies(keyWord);
    const films = localStorage.getItem('films');
    if (!films) {
      MoviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem('films', JSON.stringify(movies));
          setAllMovies(movies);
          searchMovie(keyWord);
        })
        .then(() => setIsPreloader(false))
        .catch(() => console.log(`Ошибка загрузки данных`));
    } else {
      setAllMovies(JSON.parse(films));
      searchMovie(keyWord);
      setIsPreloader(false);
    }
  };
  
  function getFavMovies(keyWord) {
    setIsPreloader(true);
    MainApi.getMovies()
      .then((movies) => {
        setFavMovies(movies.data);
      })
      .then(() => {
        searchFavMovie(keyWord);
      })  
      .catch(() => console.log(`Ошибка загрузки данных`));
    setIsPreloader(false);
  };

  function searchMovie(keyWord){
    setAllMovies((state) => state.filter((c) => c.description.includes(keyWord) && ((isShortMovie && (c.duration <= 50)) || (!isShortMovie && (c.duration > 50)))));
    setCountClick(7);
  }
  
  function searchFavMovie(keyWord){
    setFavMovies((state) => state.filter((c) => c.description.includes(keyWord) && ((isShortFavMovie && (c.duration <= 50)) || (!isShortFavMovie && (c.duration > 50)))));
  }
  
  function show() {
    setCountClick(countClick + 7);
  }
  
  function handleCardLike(card, isLike, delId) {
    if (isLike) {
      MainApi.delLikeCard(delId._id)
      .then(() => {
        setFavMovies((state) => state.filter((c) => c._id !== delId._id))
      })
      .catch(err => console.log(err));
    } else {
      MainApi.addLikeCard(card)
        .then((newCard) => {
          setFavMovies([newCard, ...favMovies]);
        })
        .catch(err => console.log(err));
      }    
  }
  
  function handleUpdateUser(user) {
    MainApi.changeUser(user)
      .then((result) => {
        setCurentUser(result.data);
        setIsInfoTooltipOpen(true);
      })
      .catch(err => console.log(err));
  }

  function handleMenuClick() {
    setIsMenuPopupOpen(true);
  }

  function closeAllPopup() {
    setIsMenuPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }
  
  function handleFilterClick() {
    setIsShortMovie(!isShortMovie);
  }

  function handleFavFilterClick() {
    setIsShortFavMovie(!isShortFavMovie);
  }

  function resetMessage() {
    setErrorMessage('');
  }

  return ( 
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Header loggedIn = {loggedIn} onMenu={handleMenuClick} />
      <Switch>
        <Route path="/signin">
          <Login loggedIn = {loggedIn} onLogin={login} errorMessage={errorMessage} resetMessage={resetMessage} />
        </Route>
        <Route path="/signup">
         
          <Register loggedIn = {loggedIn} onRegister={register} errorMessage={errorMessage} resetMessage={resetMessage} />
        </Route>
        <ProtectedRoute 
          path="/movies"
          loggedIn = {loggedIn} 
          component={Movies}
          isPreloader={isPreloader} movies={allMovies} favMovies={favMovies}
          isShort={isShortMovie} isWord={keyWordMovies}
          onSearch={getAllMovies} onFilter={handleFilterClick} onMenu={handleMenuClick}
          onMore={show} countClick={countClick} onCardLike={handleCardLike}
        />
        <ProtectedRoute 
          path="/saved-movies"
          loggedIn = {loggedIn} 
          component={SavedMovies}
          isPreloader={isPreloader} movies={favMovies} favMovies={favMovies}
          isShort={isShortFavMovie} isWord={keyWordFavMovies} 
          onSearch={getFavMovies} onFilter={handleFavFilterClick}
          onMore={show} countClick={countClick} onCardLike={handleCardLike} 
        />
        <ProtectedRoute 
          path="/profile"
          loggedIn = {loggedIn} 
          component={Profile}
          onLogout={logout} onUpdateUser={handleUpdateUser} errorMessage={errorMessage} resetMessage={resetMessage}
        />
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />

      <MenuPopup isOpen={isMenuPopupOpen} closePopup={closeAllPopup} /> 
      <InfoTolltip isOpen={isInfoTooltipOpen} closePopups={closeAllPopup}/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
