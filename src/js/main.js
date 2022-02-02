'use strict';

let results = [];
let favourites = [];

// Creo el event listener que recogerá la infor del api cuando el usuario envía su búsqueda

const searchButton = document.querySelector('.js-search-button');
const input = document.querySelector('.js-input');
/*-----API REQUEST-----*/
//1.
function getShows(event) {
  event.preventDefault();
  const inputValue = input.value;

  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      results = data;
    });
  renderShows();
  handleBackground();
}

searchButton.addEventListener('click', getShows);

/*-----APINTO LA INFO QUE ME TRAIGO DEL API en el DOM-----*/
const showsList = document.querySelector('.js-results-list');

function renderShows() {
  //reset
  showsList.innerHTML = '';
  for (let result of results) {
    //añado li
    const newLi = document.createElement('li');
    showsList.appendChild(newLi);
    newLi.classList.add('js-showItem');
    newLi.setAttribute('id', result.show.id);

    //añado imagen
    insertImage(result, newLi);

    //añado título de la serie
    const newTitle = document.createElement('h3');
    newLi.appendChild(newTitle);
    newTitle.innerHTML = result.show.name;
  }
  listenRenderShows();
}

function handleBackground() {
  for (let i = 0; i < results.length; i++) {
    //recorro el array de resultados y busco un elemento favorito del array de favoritos cuyo id coincide con el de uno de los elementos del array de resultados.
    if (
      favourites.findIndex(
        (favourite) => favourite.show.id === results[i].show.id
      ) !== -1
    ) {
      //guardo el id del resultado que está en favoritos
      const idFound = results[i].show.id;

      let resultsElements = document.querySelectorAll('.js-showItem');
      for (const element of resultsElements) {
        const resultElId = parseInt(element.getAttribute('id'));
        if (idFound === resultElId) {
          element.classList.add('favBackground');
        }
      }
    }
  }
}
//results = objetos
//resultsElement = es el item que se pinta en el dom

//función para añadir imagen
function insertImage(result, newLi) {
  const newImage = document.createElement('img');
  newLi.appendChild(newImage);
  if (result.show.image === null) {
    newImage.src = 'https://via.placeholder.com/210x295/ffffff/666666/?';
  } else {
    newImage.src = result.show.image.medium;
  }
}

//escuchador del evento sobre los elementos mostrados en la lista de resultados para ser guardados como favoritos
function listenRenderShows() {
  const shows = document.querySelectorAll('.js-showItem');
  for (const showItem of shows) {
    showItem.addEventListener('click', handleShowsClick);
  }
}

//guardo los elementos clicados de la lista de resultados en el array de favoritos
const handleShowsClick = (event) => {
  const clickedItemId = parseInt(event.currentTarget.id);
  const favouriteShowsIndex = results.find(
    (result) => result.show.id === clickedItemId
  );

  const savedShow = favourites.findIndex(
    (favourite) => favourite.show.id === clickedItemId
  );
  if (savedShow === -1) {
    favourites.push(favouriteShowsIndex);
  } else {
    favourites.splice(savedShow, 1);
  }
  updateLocalStorage();
  renderShows();
  renderFavourites();
  handleBackground();
};

/*-----PINTO LOS FAVORITOS EN EL DOM-----*/
const favouritesList = document.querySelector('.js-favourites-list');

function renderFavourites() {
  //reset
  favouritesList.innerHTML = '';
  for (let index = 0; index < favourites.length; index++) {
    const favourite = favourites[index];
    //li
    const newLi = document.createElement('li');
    favouritesList.appendChild(newLi);
    newLi.classList.add('js-favouriteItem');
    newLi.setAttribute('id', favourite.show.id); //AQUI

    //añado imagen
    insertImage(favourite, newLi);

    //añadir título
    const newTitle = document.createElement('h3');
    newLi.appendChild(newTitle);
    newTitle.innerHTML = favourite.show.name;

    // Button para eliminar favoritos
    const removeButton = document.createElement('button');
    newLi.appendChild(removeButton);
    removeButton.classList.add('removeButton', 'js-remove-favourite-button');
    removeButton.innerHTML = 'X';
    removeButton.setAttribute('id', favourite.show.id);
    removeButton.addEventListener('click', handleRemoveFavorite);
  }
}

const handleRemoveFavorite = (event) => {
  const clickedItemId = parseInt(event.currentTarget.id);
  const favouriteShowsIndex = favourites.findIndex(
    (favourite) => favourite.show.id === clickedItemId
  );
  favourites.splice(favouriteShowsIndex, 1);

  updateLocalStorage();
  renderShows();
  renderFavourites();
  handleBackground();
};

/*-----LOCAL STORAGE-----*/
const updateLocalStorage = () => {
  localStorage.setItem('favourites', JSON.stringify(favourites));
};
const getFromDataStorage = () => {
  const dataFromDataStorage = JSON.parse(localStorage.getItem('favourites'));

  if (dataFromDataStorage !== null) {
    favourites = dataFromDataStorage;
  }
};

getFromDataStorage();
renderShows();
renderFavourites();

/*-----RESET ALL-----*/
const resetButton = document.querySelector('.js-reset-button');
function clearFavourites() {
  favourites = [];
  updateLocalStorage();
  renderShows();
  renderFavourites();
}

resetButton.addEventListener('click', clearFavourites);