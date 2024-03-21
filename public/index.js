"use strict";
(function () {
  const MY_SERVER_BASEURL = "http://localhost:8000/jokebook";
  window.addEventListener("load", init);

  function init() {
    getRandomJoke();
    getCategories();
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        getJokesByCategory();
    });
    const newJokeForm = document.getElementById('new-joke-form');
    newJokeForm.addEventListener('submit', addNewJoke);
}
/**
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
**/
  const BASE_URL = 'http://localhost:8000/jokebook';

window.onload = function() {
    getRandomJoke();
    getCategories();
};

function getRandomJoke() {
    fetch(`${BASE_URL}/joke/funnyJoke`)
        .then(response => response.json())
        .then(data => {
            const jokes = data.jokes;
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            document.getElementById('random-joke').textContent = randomJoke.joke + ' ' + randomJoke.response;
        });
}

function getCategories() {
    fetch(`${BASE_URL}/categories`)
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;
            const categorySelect = document.getElementById('jokebook-category');
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                categorySelect.appendChild(option);
            });
        });
}

function getJokesByCategory() {
    const categorySelect = document.getElementById('jokebook-category');
    let category = categorySelect.options[categorySelect.selectedIndex].value;
    if (category === "") {
        alert("Category cannot be empty");
        return;
    }
    // Convert category to the format expected by the server
    category = category.replace(' ', '').toLowerCase() + 'Joke';
    fetch(`${BASE_URL}/joke/${category}`)
        .then(response => response.json())
        .then(data => {
            const jokes = data.jokes;
            const jokeList = document.getElementById('joke-list');
            jokeList.innerHTML = '';
            jokes.forEach(joke => {
                const listItem = document.createElement('li');
                listItem.textContent = joke.joke + ' ' + joke.response;
                jokeList.appendChild(listItem);
            });
        });
}

function addNewJoke(event) {
    event.preventDefault();
    let category = document.getElementById('new-joke-category').value;
    const joke = document.getElementById('new-joke-text').value;
    const response = document.getElementById('new-joke-response').value;
    if (category === "") {
        alert("Category cannot be empty");
        return;
    }
    // Convert category to the format expected by the server
    category = category.replace(' ', '').toLowerCase() + 'Joke';
    fetch(BASE_URL+ '/joke/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: category, joke: joke, response: response }),
    })
        .then(response => response.json())
        .then(() => {
            getJokesByCategory(category);
        });
}
})();