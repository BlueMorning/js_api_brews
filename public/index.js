
/*** Data with a page scope ***/
const brewApiUrl  = "https://api.punkapi.com/v2/beers";
let brews         = [];
let brewsFiltered = [];

let button_load_brews;
let input_search_by_name;
let input_search_by_food;
let span_results;
let div_brews;
let div_ingredients;

/*** Methods to manage elements of the html page ***/

const getElement = function(id){
  return document.getElementById(id);
}

const initializeElements = function(){
  button_load_brews     = getElement("button-load-brews");
  input_search_by_name  = getElement("input-search-by-name");
  input_search_by_name  = getElement("input-search-by-name");
  input_search_by_food  = getElement("input-search-by-food");
  span_results          = getElement("span-results");
  div_brews             = getElement("div-brews");
  div_ingredients       = getElement("div-ingredients");
}

const addListener = function (element, eventToCatch, callBackFunction){
  element.addEventListener(eventToCatch, callBackFunction);
}

const createElement = function (element){
  return document.createElement(element);
}

const createElementAndText = function (element, innerText){
  const newElement = document.createElement(element);
  newElement.innerText = innerText;
  return newElement;
}

const appendChildTo = function(parentChild, child){
  parentChild.appendChild(child);
}

const removeAllChildNodes = function(parent) {
  while(parent.hasChildNodes()){
    parent.firstChild.remove();
  }
}


/***Initialize the page on the loaded event ***/

const initializePage = function(){
  initializeElements();
  addListener(button_load_brews, "click", requestLoadAllBrews);
}



/*** API request ***/

const requestLoadAllBrews = function(){
  const request = new XMLHttpRequest();
  request.open("GET", brewApiUrl);
  addListener(request, "load", requestLoadAllBrewsLoaded);
  request.send();
}


/*** Handle API results ***/

const requestLoadAllBrewsLoaded = function(event){
  if(this.status === 200){
    brews         = JSON.parse(this.responseText);
    brewsFiltered = brews;
    populateData();
  }
  else {

  }
}

/*** Populate HTML page with data ***/

const populateData = function(){

  removeAllChildNodes(div_brews);
  brewsFiltered.forEach(function(brew){
    div_brews.innerHTML += createBrewDiv(brew);
  });
}


const createBrewDiv = function(brew){
  const html =
  `<div class='div-brew'>
    <div>
      <img src='${brew.image_url}' class='brew-image' />
    </div>
    <div>
      <h1 class="brew-name">${brew.name}</h1>
      <p class="brew-tagline">${brew.tagline}</p>
      <p class="brew-description">${brew.description.substring(0, 200)}...</p>
    </div>
  </div>`;
  return html;
}





addListener(document, "DOMContentLoaded", initializePage);
