'use strict';

//El navegador ejecuta el evento cuando hago click sobre el botón, así que guardo su valor.

//Extraeremos los datos de la siguiente URL:http://www.tvmaze.com/api#show-search

//A esta url necesito añadirle el texto introducido por la usuaria en el campo de búsqueda. Para ello creo una constante 'searchValue que concatenará ambos valores. Para esta constante necesito definir inputValue, así que también guardo su valor.
//TypeError: Cannot read property 'value' of null???? >>>solved: he seleccionado el elmento con su id

const results = [];
const favourites = []; //Los contenidos se añaden a posteriori.

const button = document.querySelector('.js-button');
const inputValue = document.getElementById(input);

//Necesito una función que haga la petición al servidor y ejecute el fetch.
function getShows() {
  event.preventDefault();
  const inputValue = document.getElementById(input);
  // fetch('http://api.tvmaze.com/search/shows?q=' + searchValue)
  fetch(`'http://api.tvmaze.com/search/shows?q='${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
//Añado el listener sobre el botón para obtener los nombres de las series 'get shows'.

button.addEventListener('click', getShows);
