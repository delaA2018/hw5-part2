"use strict";
(function () {
  const MY_SERVER_BASEURL = "http://localhost:3000/jokebook";
  window.addEventListener("load", init);

  function init() {
    getCategories();
  }

  function getCategories() {
    fetch(MY_SERVER_BASEURL + "/categories")
      .then(checkStatus)
      .then((response) => {
        
        console.log(response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  function getJokesByCategory(category) {
    fetch(MY_SERVER_BASEURL + "/joke/" + category)
      .then(checkStatus)
      .then((response) => {
        
        console.log(response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  function addNewJoke(category, joke, response) {
    fetch(MY_SERVER_BASEURL + "/joke/new", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category: category, joke: joke, response: response }),
    })
      .then(checkStatus)
      .then((response) => {
        
        console.log(response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  //helper functions
  function id(idName) {
    return document.getElementById(idName);
  }

  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response.json();
  }
})();