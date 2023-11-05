

// QUERY PARAMS
var queryString = window.location.search;
var urlParam = new URLSearchParams(queryString);
var searchTerm = urlParam.get('q')

//APIs

var ytAPIURL =  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=cook${searchTerm}&type=video&key=AIzaSyCmemNtsJzdm23Gvqln6QInMVz45a0oQ_Q` //replace chicken w/ search token query
//var  foodAPIurl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=f63380fe&app_key=90aaa4d2875a09ca3d7df6d0944c9096` // also replace chicken :) 

//back up YT API Key --> AIzaSyCmemNtsJzdm23Gvqln6QInMVz45a0oQ_Q

// EVENT LISTENER    <--- on load for now, until we connect functionality from index 

window.addEventListener("load", (event) => {
    event.preventDefault();
    videosLoad();

    console.log("page is fully loaded");


  });




/// YOUTUBE API FETCHING

function videosLoad() {
fetch(ytAPIURL)
.then (function (response){
    return response.json();
}) 

// GET DATA
.then(function (data){
    var { items } = data
    console.log(items);

// CREATE AND APPEND VIDEO CARDS    
    items.forEach(function(items){
        var card = document.createElement('div');
        card.classList.add('card')
        card.innerHTML = `
        <div class="column">
            <div class="card  "> 
                <header class="card-header">
                    <p class="card-header-title">
                        ${items.snippet.title}
                    </p>
                    <button class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </header>
                <div class="card-content">
                    <div class="content">
                        <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${items.id.videoId}">
                        </iframe>
                        <br /><br />
                        <p></p>
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item saveBtn">Save</a>

                </footer>

            </div>
        </div>
        `  
        document.getElementById('videos').appendChild(card)

    })
    
})}

// FETCH EDAMAM
//fetch(foodAPIurl)
//.then (function (response){
////    return response.json();
//}) 
//.then(function (data){
//    console.log(data);
//})

// alberts edamam funcionality

var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-query');
var resultsList = document.querySelector('#results');
var searchButton = document.querySelector('.search-btn');
var saveBtn = document.createElement('button');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  var searchValue = searchInput.value.trim();
  if (searchValue === '') return;

  var appId = 'f63380fe&'
  var appKey = '90aaa4d2875a09ca3d7df6d0944c9096'

  var url = `https://api.edamam.com/search?q=${searchValue}&app_id=f63380fe&app_key=90aaa4d2875a09ca3d7df6d0944c9096&from=0&to=4`
  try { 
    var response = await fetch(url);
    if (!response.ok) {
      throw new Error('API responded with an error:', response.status);
    }
    var data = await response.json();
      displayRecipes(data.hits)
  } catch (error) { 
    console.error('Error:', error);

  }
});  

function displayRecipes(hits) {
  var container = document.getElementById('ed-recipes');
  
  //var cardContainer = document.createElement('div');
  //cardContainer.classList.add('container-2');

  var heading = document.createElement('h2');
 // heading.style.fontSize = '24px';
  //heading.style.fontWeight = 'bold';
  //heading.textContent = 'Check out these recipes';

  //cardContainer.appendChild(heading);

  hits.forEach((hit) => {
    var recipe = hit.recipe;

    var cardCol = document.createElement('div')
    cardCol.classList.add('column')

    var card = document.createElement('div');
    card.classList.add('card');

    var header = document.createElement('header');
    header.classList.add('card-header');

    var headerTitle = document.createElement('p');
    headerTitle.classList.add('card-header-title');
    headerTitle.textContent = recipe.label;

    var headerIcon = document.createElement('button');
    headerIcon.classList.add('card-header-icon');
    headerIcon.setAttribute('aria-label', 'more options');

    var icon = document.createElement('span');
    icon.classList.add('icon');

    var angleDownIcon = document.createElement('i');
    angleDownIcon.classList.add('fas', 'fa-angle-down');
    angleDownIcon.setAttribute('aria-hidden', 'true');

    icon.appendChild(angleDownIcon);
    headerIcon.appendChild(icon);

    header.appendChild(headerTitle);
    header.appendChild(headerIcon);

    var content = document.createElement('div');
    content.classList.add('card-content');

    var innerContent = document.createElement('div');
    innerContent.classList.add('content');

    var ingredients = document.createElement('ul');
    ingredients.classList.add('content');

    recipe.ingredients.forEach((ingredient) => {
      var li = document.createElement('li');
      li.textContent = ingredient.text;
      ingredients.appendChild(li);
    });

    innerContent.appendChild(ingredients);
    content.appendChild(innerContent);

    var footer = document.createElement('footer');
    footer.classList.add('card-footer');

    var saveBtn = document.createElement('a');
    saveBtn.classList.add('card-footer-item', 'saveBtn');
    saveBtn.href = '#';
    saveBtn.textContent = 'Save';

    footer.appendChild(saveBtn);

    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(footer);
    container.appendChild(cardCol);
    cardCol.appendChild(card)

   // cardContainer.appendChild(card);
  });

 // container.appendChild(cardContainer);
 //container.appendChild(cardCol);
 //cardCol.appendChild(card)
}



 function displaySavedRecipes() {
   var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

   savedRecipes.forEach(function (savedRecipe) {
    var card = document.createElement('div');
    card.classList.add('card');
     resultsList.appendChild(card);
   });
 }

 window.addEventListener('DOMContentLoaded', function () {
   console.log('this code ran')
   var data = JSON.parse(localStorage.getItem('recipesData'));
   displayRecipes(data.hits);
  
 });

 if (window.location.pathname === '/Page2.html') {
  window.addEventListener('load', displaySavedRecipes);

 }