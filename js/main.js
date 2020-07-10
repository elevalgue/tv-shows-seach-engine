'use strict';

//R E C U E R D A !: Pintar  > Escuchar > Guardar (LOCALSTORAGE)

const favList = document.querySelector('.js-favourite-titles-list');

let results = [];
let favourites = [];

//  PINTAR LAS SERIES > limpio y pinto (Paint API results on DOM)
const showsList = document.querySelector('.js-search-results-list');
function paintShows() {
  for (let result of results) {
    console.log(result.show.name);
    //añado los li (container)
    const newLi = document.createElement('li');
    showsList.appendChild(newLi);
    //añado la imagen
    // addImage; // me tengo que crear una función para poder obtener la imagen?
    //añado h3
    const newTitle = document.createElement('h3');
    newLi.appendChild(newTitle);
    newTitle.innerHTML = result.show.name;
  }
}

const button = document.querySelector('.js-button');
const inputValue = document.getElementById(input);
const favouriteList = document.querySelector('.js-favourite-list');

//Función que busca las series en el API (API request)
function getShows() {
  event.preventDefault();
  const inputValue = document.querySelector('.input').value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      results = data; //aquí me estoy guardando toda la info del array
      paintShows();
    });
}

button.addEventListener('click', getShows);
