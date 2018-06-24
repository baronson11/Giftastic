// Selectors ----------------------------------------------

const form = document.getElementById('form');
const contentSection = document.querySelector('.container');
const footerSection = document.querySelector('.footer');
const clearResults = document.getElementById('clearResults');

// Globals -------------------------------------------------

let value = '';
const apiKey = '7a98wwVKTQiz7dJXtoAVn8dg06BmFNvA';

// AJAX REQUEST & CONTENT CREATION -------------------------

function AJAXRequest() {
  let queryURL = `https://api.giphy.com/v1/gifs/search?q=${value}&api_key=${apiKey}&limit=10`;
  // INITIALIZE AJAX REQUEST
  let xhr = new XMLHttpRequest();
  // OPEN AJAX REQUEST
  xhr.open('GET', queryURL, true);
  // FUNCTION TO RUN FOR REQUEST
  xhr.onload = function() {
    if (xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      console.log(response);
      for (let i = 0; i < 10; i++) {
        let gifDiv = document.createElement('div');
        gifDiv.innerHTML = `<img src="${response.data[i].images.fixed_height.url}"
        data-still="${response.data[i].images.fixed_height_still.url}"
        data-animate="${response.data[i].images.fixed_height.url}"
        state="animate" title="Rating: ${response.data[i].rating}">`;
        contentSection.appendChild(gifDiv);
        console.log(gifDiv);
      }
    }
  }
  //SEND AJAX REQUEST
  xhr.send();
}

// LISTENERS -------------------------------------------------------------
// Runs request for searched items and stores previous searches in footer

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // capture text and store in value variable
  value = document.getElementById('search').value;
  // create and append recent searches to footer
  let button = document.createElement('button');
  button.className = 'searches';
  button.textContent = value;
  footerSection.appendChild(button);
  // .../end button create & append
  AJAXRequest();
});

// Clear results button to remove all results from Page

clearResults.addEventListener('click', () => {
  while (contentSection.firstElementChild) {
    contentSection.removeChild(contentSection.firstElementChild);
  }
});

// Listens for when buttons in footer are clicked, to trigger another ajax call
// Also listening for when an animated gif is clicked, to make it still

document.addEventListener('click', (event) => {
  let clickState = event.target.getAttribute("state");
  let animateURL = event.target.getAttribute("data-animate");
  let stillURL = event.target.getAttribute("data-still");
  if (clickState == 'animate') {
    event.target.setAttribute("src", stillURL);
    event.target.setAttribute("state", 'still');
  }
  else if (clickState == 'still') {
    event.target.setAttribute("src", animateURL);
    event.target.setAttribute("state", 'animate');
  }
  if (event.target.className === 'searches') {
    let recentButton = event.target.textContent;
    value = recentButton;
    AJAXRequest();
  }
});
