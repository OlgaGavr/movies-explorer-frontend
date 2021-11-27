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
 
  const [keyWordMovies, setKeyWordMovies] = React.useState('');
  const [keyWordFavMovies, setKeyWordFavMovies] = React.useState('');

  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [isShortFavMovie, setIsShortFavMovie] = React.useState(false);

  const [allMovies, setAllMovies] = React.useState([]);
  const [favMovies, setFavMovies] = React.useState([]);

  
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(true);
  const [infoCaption, setInfoCaption] = React.useState('');
  
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);  
  const [currentRow, setCurrentRow] = React.useState(5);
  const [countClick, setCountClick] = React.useState(0);

  function resize() {
    const currentHideNav = window.innerWidth;
    if (currentHideNav <= 425) {
      setCurrentRow(5);
    } else {
      setCurrentRow(7);
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
        })

    } 
  }, [loggedIn]);
  
  React.useEffect(() => {
    MainApi.getAllData()
    .then((data) => {
      setCurentUser(data[0].data);
      setFavMovies(data[1].data);
    })
    // setKeyWordMovies(localStorage.getItem('word'));
    // setIsShortMovie(localStorage.getItem('short'));
    // MainApi.getUser()
    //   .then((res) => {
    //     if (res.message) {
    //       throw res
    //     } else {
    //       return res
    //     }
    //   })
    //   .then((res) => {
    //     setCurentUser(res.userData);
    //   })
    //   .catch((err) => {
    //     setErrorMessage(err.message);
    //   });
  }, []);

//  React.useEffect(() => {
    // MainApi.getMovies()
    //   .then((res) => {
    //     if (res.message) {
    //       throw res
    //     } else {
    //       return res
    //     }
    //   })
    //   .then((res) => {
    //     setFavMovies(res.data);
    //   })
    //   .catch((err) => {
    //     setErrorMessage(err.message);
    //   });
 // }, []);
  
  React.useEffect(() => {
    if (loggedIn) {
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
        })
        .then(() => {
          searchFavMovie(keyWordFavMovies);
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    } 
  }, [isShortFavMovie]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (keyWordMovies==='') return;
    const films = localStorage.getItem('films');
    setAllMovies(JSON.parse(films));
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
    setLoggedIn(false);
    setAllMovies('');
    setFavMovies('');
    history.push('/signin');
  }
  
  function getAllMovies(keyWord) {
    setIsPreloader(true);
        
    // if (!keyWord) {
    //   keyWord = localStorage.getItem('word');
    //   setIsShortMovie(localStorage.getItem('short'));
    // } else {
    //   localStorage.setItem('word', JSON.stringify(keyWord));
    //   localStorage.setItem('short', JSON.stringify(isShortMovie));
    // }
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
    setKeyWordFavMovies(keyWord);
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
    
    const keyWordReady = keyWord.trim().toLowerCase();
    setAllMovies((state) => state.filter((c) => c.nameRU.toLowerCase().includes(keyWordReady) && ((isShortMovie && (c.duration <= 40)) || (!isShortMovie && (c.duration > 40)))));
    setCountClick(currentRow);
  }
  
  function searchFavMovie(keyWord){
    const keyWordReady = keyWord.trim().toLowerCase();
    setFavMovies((state) => state.filter((c) => c.nameRU.toLowerCase().includes(keyWordReady) && ((isShortFavMovie && (c.duration <= 40)) || (!isShortFavMovie && (c.duration > 40)))));
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
