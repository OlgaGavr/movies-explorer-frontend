import {option} from '../utils/constants.js';  

const checkResponse = (response) => {
  console.log(response.ok);
  return response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
}

export const getMovies = () => {
  return fetch(`${option.url}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      
    },
  })
  .then(res => checkResponse(res));
}

