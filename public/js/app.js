// Selectors ----------------------------------------------
const form = document.getElementById('form');
const contentSection = document.querySelector('.container');
const footerSection = document.querySelector('.footer');
const clearResults = document.getElementById('clearResults');

// Globals -------------------------------------------------
// let value = '';

// AJAX REQUEST & CONTENT CREATION -------------------------
function AJAXRequest(value) {
  let data = {
      search: value
  }

  fetch(`/api/search`, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let response = data;
        for (let i = 0; i < 10; i++) {
          let gifDiv = document.createElement('div');
          gifDiv.innerHTML = `<img src="${response.data[i].images.fixed_height.url}"
          data-still="${response.data[i].images.fixed_height_still.url}"
          data-animate="${response.data[i].images.fixed_height.url}"
          state="animate" title="Rating: ${response.data[i].rating}">`;
          contentSection.appendChild(gifDiv);
          console.log(gifDiv);
        }
    })
    .catch(err => console.log(err));
}

// LISTENERS -------------------------------------------------------------
// Runs request for searched items and stores previous searches in footer

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // capture text and store in value variable
  let value = document.getElementById('search').value;
  // create and append recent searches to footer
  let button = document.createElement('button');
  button.className = 'searches';
  button.textContent = value;
  footerSection.appendChild(button);
  // .../end button create & append
  AJAXRequest(value);
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
    let value = recentButton;
    AJAXRequest(value);
  }
});
