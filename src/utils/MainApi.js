import {optionAuth} from '../utils/constants.js';  

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
}

const headers={
  'Content-Type': 'application/json',
}

export const getUser = () => {
  return fetch(`${optionAuth.url}/users/me`, {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    }
  })
  .then(res => checkResponse(res));
}

export const getMovies = () => {
  return fetch(`${optionAuth.url}/movies`, {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    }
  })
  .then(res => checkResponse(res));
}

export const getAllData = () => {
  return Promise.all([getUser(), getMovies()])
}

export const register = ({ email, password, name}) => {
  return fetch(`${optionAuth.url}/signup`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  })
  .then((res) => {return res.json()});
}

export const authorize = ( {email, password} ) => {
  return fetch(`${optionAuth.url}/signin`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  .then(res => {return res.json()});
}

export const getContent = (token) => {
  return fetch(`${optionAuth.url}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
  .then(res => {return res.json()});
}

export const addLikeCard = (newCard) => {
  return fetch(`${optionAuth.url}/movies`, {
    method: 'POST',
    headers: {
      authorization:  'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: newCard.country,
      director: newCard.director,
      duration: newCard.duration,
      year: newCard.year,
      description: newCard.description,
      image: 'https://api.nomoreparties.co' + newCard.image.url,
      trailer: newCard.trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + newCard.image.formats.thumbnail.url,
      movieId: newCard.id,
      nameRU: newCard.nameRU,
      nameEN: newCard.nameEN
    })
  })
  .then(res => checkResponse(res));
}

export const delLikeCard = (movieId) => {
  return fetch(`${optionAuth.url}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      authorization:  'Bearer ' + localStorage.getItem('jwt'),
    },
  })
  .then(res => checkResponse(res));
}

export const changeUser = (user) => {
  return fetch(`${optionAuth.url}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('jwt'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email
    })
  })
    .then(res => checkResponse(res));
}

