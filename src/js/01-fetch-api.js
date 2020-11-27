/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

console.log('>> Ready :)');

let results = [];

/*----- SELECTORS -----*/

const inputValue = document.querySelector('.js-search__form').value;

/*-----API REQUEST-----*/

function getShows(event) {
  event.preventDefault();
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      results.show = data;
      // renderShows();

    });
}
/*-----SHOW ERROR-----*/

function showErrorMessage() {
  if (data.length === 0) {
    renderNoResults();
  } else {
    renderShows(data);
  }
}


/*-----PRINT THE SHOWS GIVEN BY THE API IN  THE DOM-----*/

const showsList = document.querySelector('.js-results-list');

function renderShows() {
  //reset
  showsList.innerHTML = '';
  for (let item of array) {
    //añado li
    const newLi = document.createElement('li');
    showsList.appendChild(newLi);
    newLi.classList.add('js-showItem');
    newLi.setAttribute('id', result.show.id);
  }
}