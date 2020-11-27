'use strict';

let results = [];

/*----- SELECTORS -----*/

const inputValue = document.querySelector('.input').value;

/*-----API REQUEST-----*/

function getShows(event) {
  event.preventDefault();
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      results.show = data;
      renderShows();

    });
}

/*-----PRINT THE SHOWS GIVEN BY THE API IN  THE DOM-----*/

