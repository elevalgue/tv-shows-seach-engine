'use strict';

//R E C U E R D A !: Pintar  > Escuchar > Guardar (LOCALSTORAGE)

//Arrays donde guardaremos el listado de series y las marcadas como favoritas
let results = [];
let favourites = [];

//Constantes
const button = document.querySelector('.js-search-button');
// const inputValue = document.querySelector('.input').value;
const favouritesContainer = document.querySelector('.favourite-list-container');
const resultsContainer = document.querySelector('.results-list-container');

//Función que busca las series en el API (API request)
function getShows() {
  event.preventDefault();
  const inputValue = document.querySelector('.input').value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      results = data; //aquí me estoy guardando toda la info del array
      console.log(results);
      renderShows();
    });
}

button.addEventListener('click', getShows);

//Pinto la información que me devuelve el API en el DOM
const showsList = document.querySelector('.js-results-list');
function renderShows() {
  console.log(results);
  //RESET SEARCH

  showsList.innerHTML = '';
  for (let result of results) {
    // console.log(result.show.name);
    //añado los li (container)
    const newLi = document.createElement('li');
    showsList.appendChild(newLi);
    newLi.setAttribute('id', '.js-showItem');
    newLi.setAttribute('id', result.show.id);
    //añado la imagen
    const newImage = document.createElement('img');
    insertImage(result, newLi);
    // console.log(result.show.image);
    const newTitle = document.createElement('h2');
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
//Escucho las series encontradas para poder añadirlas a los favoritos

// function listenRenderShows() {
//   const shows = document.querySelectorAll('.showItem');
//   for (let index = 0; index < results.length; index++) {
//     shows[index].listenRenderShows('click', saveFavourites);
//   }
//   listenRenderShows();
// }

function listenRenderShows() {
  const shows = document.querySelectorAll('.js-showItem');
  for (const showItem of showList) {
    showItem.addEventListener('click', saveFavourites);
  }
}
// listenRenderShows();
// const handlerShowsClick = (event) => {
//   const clickedId = parseInt(event.currentTarget.id);
//   const ShowFind = searchShows.find(
//     (showItem) => showItem.show.id === clickedId
//   );
// };
// debugger;
// function saveFavourites(event) {
//   //identifico el elemento clicado
//   const clickedShowItemId = event.currentTarget.id;
//   const showItem = document.geElementById(clickedShowItemId);
//   showItem.classList.toggle('.favouriteShow');
//   const favouriteShowItem = results.find((result) => {
//     return result.show.id === parseInt(showItem.id);
//   });

//pusheo para agregar los item al final de array

// favourites.push(favouriteShowItem);
