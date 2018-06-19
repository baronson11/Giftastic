// Selectors ----------------------------------------------

const form = document.getElementById('form');
const box1= document.querySelector('.box-1');
const contentSection = document.querySelector('.container');
const footerSection = document.querySelector('.footer');
const contentChildren = contentSection.children;
const clearResults = document.getElementById('clearResults');

// AJAX REQUEST & CONTENT CREATION -------------------------

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // capture text and store in value variable
  let value = document.getElementById('search').value;
  console.log(value);
  // create and append recent searches to footer
  let button = document.createElement('button');
  button.className = 'searches';
  button.textContent = value;
  footerSection.appendChild(button);
  // .../end button create & append
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=7a98wwVKTQiz7dJXtoAVn8dg06BmFNvA&limit=10";
  // INITIALIZE AJAX REQUEST
  let xhr = new XMLHttpRequest();
  // OPEN AJAX REQUEST
  xhr.open('GET', queryURL, true);
  // FUNCTION TO RUN FOR REQUEST
  xhr.onload = function() {
    if (xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      console.log(response);
      for ( let i = 0; i < 10; i++) {
        let gifDiv = document.createElement('div');
        gifDiv.innerHTML = '<img src="' + response.data[i].images.fixed_height.url + '">';
        contentSection.appendChild(gifDiv);
      }
    }
  }
  //SEND AJAX REQUEST
  xhr.send();
});

clearResults.addEventListener('click', () => {
  console.log('button works!');
  // for loop not functional
  for (let i = 0; i < contentChildren.length; i++) {
    contentSection.removeChild(contentChildren);
  }
});

document.addEventListener('click', (event) => {
  if (event.target.className === 'searches') {
    console.log('buttons in footer work');
  }
});
