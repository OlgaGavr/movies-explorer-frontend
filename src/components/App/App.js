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
import {optionFilms, optionScreen} from '../../utils/constants.js';

function App() {
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurentUser] = React.useState({});
 
  const [keyWordMovies, setKeyWordMovies] = React.useState('');
  const [keyWordFavMovies, setKeyWordFavMovies] = React.useState('');

  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [isShortFavMovie, setIsShortFavMovie] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]);
  const [favMovies, setFavMovies] = React.useState([]);
  const [likeMovies, setLikeMovies] = React.useState([]);

  
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(true);
  const [infoCaption, setInfoCaption] = React.useState('');
  
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);  
  const [currentRow, setCurrentRow] = React.useState(5);
  const [countClick, setCountClick] = React.useState(0);

  function resize() {
    const currentWidthScreen = window.innerWidth;
    if (currentWidthScreen <= optionScreen.widthNarrow) {
      setCurrentRow(optionFilms.countFilms.narrow);
    } else {
      setCurrentRow(optionFilms.countFilms.wide);
    } 
  }
 
  React.useEffect(() => {
    window.addEventListener("resize", resize);
  }, []);
  React.useEffect(() => {
    resize();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      MainApi.getAllData()
        .then((data) => {
          setCurentUser(data[0].data);
          setFavMovies(data[1].data);
          setLikeMovies(data[1].data);
        })

    } 
  }, [loggedIn, history]);
  
  React.useEffect(() => {
    MainApi.getAllData()
    .then((data) => {
      setCurentUser(data[0].data);
      setFavMovies(data[1].data);
      setLikeMovies(data[1].data);
    })
    const films = localStorage.getItem('films');
    const word = localStorage.getItem('word');
    const short = localStorage.getItem('short');
    if (JSON.parse(films) && (JSON.parse(word) !=='')) {
      setAllMovies(JSON.parse(films));
      setKeyWordMovies(JSON.parse(word));
      setIsShortMovie(JSON.parse(short));
      searchMovie(JSON.parse(word));
    } else {
        setAllMovies([]);
        setIsShortMovie(false);
      }
  }, []);
 
  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {  // короткометражки любимые фильмы
    if (loggedIn) {
      console.log('короткометражки любимые фильмы')
      MainApi.getMovies()
        .then((res) => {
          if (res.message) {
            throw res
          } else {
            return res
          }
        })
        .then((res) => {
          setFavMovies(res.data);
          setLikeMovies(res.data);
        })
        .then(() => {
          searchFavMovie(keyWordFavMovies);
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    } 
  }, [isShortFavMovie]);

  React.useEffect(() => {  // короткометражки фильмы
    localStorage.setItem('short', JSON.stringify(isShortMovie));
    if (keyWordMovies==='') return;
    setAllMovies(JSON.parse(localStorage.getItem('films')));
    searchMovie(keyWordMovies);
  }, [isShortMovie]);
 
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
      setLoading(false);
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
        setCurentUser({ 
          email: res.email,
          name: res.name,
          _id: res._id,
        });
        setLoggedIn(true);
        setLoading(false);
       
        if ((location.pathname==='/signin' || location.pathname==='/signup')&&(loggedIn||loading)) {
          history.goBack();
        } else if (loggedIn===loading) {
          history.push('/movies');
        } 
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }
  
  function handleUpdateUser(user) {
    return MainApi
      .changeUser(user)
      .then((res) => {
        if (res.message) {
          throw res
        } else {
          return res
        }
      })
      .then((res) => {
        setCurentUser(res.data);
        setIsInfoTooltipOpen(true);
        setInfoCaption('Вы успешно изменили свои данные!');
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  function logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('films');
    localStorage.removeItem('word');
    localStorage.removeItem('short');
    setLoggedIn(false);
    setAllMovies('');
    setFavMovies('');
    setLikeMovies('');
    setIsShortMovie(false);
    setIsShortFavMovie(false);
    setKeyWordMovies('');
    setKeyWordFavMovies('');
    history.push('/signin');
  }
  
  function getAllMovies(keyWord) {
    setIsPreloader(true);
    setKeyWordMovies(keyWord);
    localStorage.setItem('word', JSON.stringify(keyWord));
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
    setKeyWordFavMovies(keyWord);
    MainApi.getMovies()
      .then((movies) => {
        setFavMovies(movies.data);
        setLikeMovies(movies.data);
      })
      .then(() => {
        searchFavMovie(keyWord);
      })  
      .catch(() => console.log(`Ошибка загрузки данных`));
    setIsPreloader(false);
  };

  function searchMovie(keyWord){
    const keyWordReady = keyWord.trim().toLowerCase();
    localStorage.setItem('word', JSON.stringify(keyWordReady));
    setAllMovies((state) => state.filter((c) => c.nameRU.toLowerCase().includes(keyWordReady) 
                                                && ((isShortMovie && (c.duration <= optionFilms.durationShort)) 
  //                                              || (!isShortMovie && (c.duration > optionFilms.durationShort)))));
                                                  || (!isShortMovie))));
    setCountClick(currentRow);
  }
  
  function searchFavMovie(keyWord){
    const keyWordReady = keyWord.trim().toLowerCase();
    setFavMovies((state) => state.filter((c) => c.nameRU.toLowerCase().includes(keyWordReady) 
                                                && ((isShortFavMovie && (c.duration <= optionFilms.durationShort))
                                                || (!isShortFavMovie)))); 
  //                                              || (!isShortFavMovie && (c.duration > optionFilms.durationShort)))));
  }
  
  function show() {
    setCountClick(countClick + currentRow);
  }

  function handleCardLike(card, isLike, delId) {
    if (isLike) {
      return MainApi
      .delLikeCard(delId._id)
      .then((res) => {
        if (res.message) {
          throw res
        } else {
          return res
        }
      })
      .then((res) => {
        setFavMovies((state) => state.filter((c) => c._id !== delId._id))
        setLikeMovies((state) => state.filter((c) => c._id !== delId._id))
      })
      .catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        setInfoCaption(err.message);
      });
    } else {
      return MainApi
        .addLikeCard(card)
        .then((res) => {
          if (res.message) {
            throw res
          } else {
            return res
          }
        })
        .then((res) => {
          setFavMovies([res, ...favMovies]);
          setLikeMovies([res, ...favMovies]);
        })
        .catch(err => {
          setIsSuccess(false);
          setIsInfoTooltipOpen(true);
          setInfoCaption('Невозможно сохранить карточку');
        });
      }    
  }
  
  function handleMenuClick() {
    setIsMenuPopupOpen(true);
  }

  function closeAllPopup() {
    setIsMenuPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setInfoCaption('');
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
      { (loading) ?
      (<div>...Loading</div>) :
      (<div>
        <Switch>
        <Route path="/movies">
          <Header loggedIn = {loggedIn} onMenu={handleMenuClick} />
        </Route>
        <Route path="/saved-movies">
          <Header loggedIn = {loggedIn} onMenu={handleMenuClick} />
        </Route>
        <Route path="/profile">
          <Header loggedIn = {loggedIn} onMenu={handleMenuClick} />
        </Route>
        <Route exact path="/">
          <Header loggedIn = {loggedIn} onMenu={handleMenuClick} />
        </Route>
      </Switch>
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
          isPreloader={isPreloader} movies={allMovies} favMovies={likeMovies}
          isShort={isShortMovie} isWord={keyWordMovies}
          onSearch={getAllMovies} onFilter={handleFilterClick} onMenu={handleMenuClick}
          onMore={show} countClick={countClick} onCardLike={handleCardLike}
        />
        <ProtectedRoute 
          path="/saved-movies"
          loggedIn = {loggedIn} 
          component={SavedMovies}
          isPreloader={isPreloader} movies={favMovies} favMovies={likeMovies}
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
      <Switch>
        <Route path="/movies">
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Footer />
        </Route>
        <Route exact path="/">
          <Footer />
        </Route>
      </Switch> 
      </div>)}

      <MenuPopup isOpen={isMenuPopupOpen} closePopup={closeAllPopup} /> 
      <InfoTolltip isOpen={isInfoTooltipOpen} closePopups={closeAllPopup} isSuccess={isSuccess} caption={infoCaption} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
