import React from 'react';
import { Route, Switch } from 'react-router-dom';

import "./App.css";
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';

// import Main from '../Main/Main.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
        
      </Switch>  
      <Footer />
    </div>
  );
}

export default App;
