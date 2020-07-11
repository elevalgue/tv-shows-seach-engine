'use strict';

//R E C U E R D A !: Pintar  > Escuchar > Guardar (LOCALSTORAGE)

//Arrays donde guardaremos el listado de series y las marcadas como favoritas
let results = [];
let favourites = [];

//Constantes
const button = document.querySelector('.js-button');
const inputValue = document.querySelector('.input').value;
const favouriteList = document.querySelector('.js-favourite-list');
const favList = document.querySelector('.js-favourite-titles-list');

//Función que busca las series en el API (API request)
function getShows() {
  event.preventDefault();
  const inputValue = document.querySelector('.input').value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      results = data; //aquí me estoy guardando toda la info del array
      renderShows();
    });
}

button.addEventListener('click', getShows);

//Pinto la información que me devuelve el API
const showsList = document.querySelector('.js-search-results-list');
function renderShows() {
  for (let result of results) {
    console.log(result.show.name);
    //añado los li (container)
    const newLi = document.createElement('li');
    showsList.appendChild(newLi);
    //añado la imagen
    const newImage = document.createElement('img');
    insertImage(result, newLi);
    console.log(result.show.image); /*toma! 💪*/
    const newTitle = document.createElement('h3');
    newLi.appendChild(newTitle);
    newTitle.innerHTML = result.show.name;
  }
}

// Función para añadir las imágenes de los respectivos <li>
function insertImage(result, newLi) {
  const newImage = document.createElement('img');
  newLi.appendChild(newImage); //he creado una función para coger las imágenes del servidor correspondientes a cada iteración y la llamo dentro de la función renderShows.
  if (!result.show.image) {
    newImage.src = 'https://via.placeholder.com/210x295/ffffff/666666/?';
  } else {
    newImage.src = result.show.image.medium;
  }
}

//Escucho las series encontradas
function addListenertoResults() {}
