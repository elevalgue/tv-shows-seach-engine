'use strict';

let results = [];
let favourites = [];

//Constantes
const button = document.querySelector('.js-search-button');
const favouritesContainer = document.querySelector('.favourite-list-container');
const resultsContainer = document.querySelector('.results-list-container');
const resetButton = document.querySelector('.js-reset-button');

//1.API request
function getShows() {
  event.preventDefault();
  const inputValue = document.querySelector('.input').value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      results = data;
      console.log(results);
      renderShows();
    });
}

button.addEventListener('click', getShows);

//2.PINTO LA INFO QUE ME TRAIGO DEL API en el DOM
const showsList = document.querySelector('.js-results-list');
function renderShows() {
  //reset
  showsList.innerHTML = '';
  const resultsList = document.querySelector('.js-results-list');
  const resultsListTitle = document.querySelector('.results-list-title');
  resultsListTitle.classList.remove('hidden');
  for (let result of results) {
    const newLi = document.createElement('li');
    showsList.appendChild(newLi);
    newLi.classList.add('js-showItem');
    newLi.setAttribute('id', result.show.id);
    const newImage = document.createElement('img');
    insertImage(result, newLi);
    const newTitle = document.createElement('h2');
    newLi.appendChild(newTitle);
    newTitle.innerHTML = result.show.name;
  }
  listenRenderShows();
}

// FUNCIÓN PARA AÑADIR IMAGEN
function insertImage(result, newLi) {
  const newImage = document.createElement('img');
  newLi.appendChild(newImage);
  if (result.show.image === null) {
    newImage.src = 'https://via.placeholder.com/210x295/ffffff/666666/?';
  } else {
    newImage.src = result.show.image.medium;
  }
}

function listenRenderShows() {
  const shows = document.querySelectorAll('.js-showItem');
  for (const showItem of shows) {
    showItem.addEventListener('click', saveFavourites);
  }
}

function saveFavourites(event) {
  const clickedShowItemId = event.currentTarget.id;
  const showItem = document.getElementById(clickedShowItemId);
  showItem.classList.toggle('favouriteShow');
  const favouriteShowItem = results.find((result) => {
    return result.show.id === parseInt(showItem.id);
  });
  favourites.push(favouriteShowItem);
  updateLocalStorage();
  renderFavourites();
  console.log(favourites);
}

//PINTO LOS FAVORITOS EN EL DOM
function renderFavourites() {
  //Reset
  const favouritesList = document.querySelector('.favourites-list');
  favouritesList.innerHTML = '';
  const favouritesListTitle = document.querySelector('.favourites-list-title');
  favouritesListTitle.classList.remove('hidden');
  for (let favourite of favourites) {
    const newLi = document.createElement('li');
    favouritesListTitle.appendChild(newLi);
    newLi.classList.add('js-favouriteItem');
    newLi.setAttribute('id', favourite.show.id);
    const newFavouriteImage = document.createElement('img');
    insertFavouriteImage(favourite, newLi);
    console.log(favourite.show.image);
    const newTitle = document.createElement('h2');
    newLi.appendChild(newTitle);
    newTitle.innerHTML = favourite.show.name;
    const removeFavouriteButton = document.createElement('i');
    removeFavouriteButton.addEventListener('click', removeFavourite);

    //NECESITO MOFICICAR AQUÍ

    //   const favouriteShowItem = results.find((result) => {
    //     return result.show.id === parseInt(showItem.id);
    //   });
    //   favourites.push(favouriteShowItem);
    //   updateLocalStorage();
    //   renderFavourites();
    //   //pusheo para agregar los item al final de array
    //   console.log(favourites);
    // }
    newLi.appendChild(removeFavouriteButton);
    removeFavouriteButton.classList.add(
      'removeFavouriteButton',
      'js-remove-favourite-button'
    );
    removeFavouriteButton.innerHTML = 'X';
  }
}
// FUNCIÓN PARA AÑADIR IMAGEN
function insertFavouriteImage(favourites, newLi) {
  const newFavouriteImage = document.createElement('img');
  newLi.appendChild(newFavouriteImage);
  if (favourites.show.image === null) {
    newFavouriteImage.src =
      'https://via.placeholder.com/210x295/ffffff/666666/?';
  } else {
    newFavouriteImage.src = favourites.show.image.medium;
  }
}

//LOCAL STORAGE
const updateLocalStorage = () => {
  localStorage.setItem('favourites', JSON.stringify(favourites));
};
const getlFromDataStorage = () => {
  const dataFromDataStorage = JSON.parse(localStorage.getItem('favourites'));
  if (favourites !== null) {
    favourites = dataFromDataStorage;
  }
};

//BORRO LOS FAVORITOS
const removeFavourite = () => {
  console.log('la primera temporada estuvo mejor');
};
getlFromDataStorage();
renderFavourites();
