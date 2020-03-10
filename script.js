var apiKey = "c854463e2ca8424e914f5a3a511a6c29";

// Will contain search results as an array of objects
// Each object takes the form
/*
object {
  id: integer,
  title: string
}
*/
var searchResults = [];

// Recipe image URL function
// Takes 1 argument, a 'recipe ID'
// Outputs the URL for the corresponding image
// https://spoonacular.com/food-api/docs#Show-Images/ 
function recipeURL(recipeID) {
  return ("https://spoonacular.com/recipeImages/" + recipeID + "-240x150.jpg");
  
}

// UNFINISHED
// Ingredient list function
// Takes 1 argument, an array of 'extended ingredients'
// Outputs an array with the list of 'ingredient' objects
function ingredientList(recipeInfo) {

}

// Basic recipe card display function
// Takes 1 argument, a basic recipe object
// Appends a completed card to the display area
function buildRecipeCard(recipe) {
  var recipeTitle = recipe.title;
  var recipeImage = recipeURL(recipe.id);
  var recipeCard = $("<div class=\"recipe-card\" id=\"recipe-card-" + recipe.id + "\"></div>");
  recipeCard.append("<div class =\"recipe-card-thumbnail\"><img src=\"" + recipeImage + "\"><h2 class=\"recipe-name\"><a href=\"#\">" + recipeTitle + "</a></h2><span class=\"recipe-source\">Recipe Source</span><div class=\"recipe-card-footer-bar\"><button href=\"#\" class=\"product-card-color-option\"><i data-id=\"" + recipe.id + "\" class=\"fas fa-info-circle\"></i></button><button href=\"#\" class=\"product-card-color-option\"><i data-tite=\"" + recipe.title + "\" data-id=\"" + recipe.id + "\" class=\"fas fa-plus\"></i></button></div></div>");
  $("#recipe-display").append($(recipeCard));
}
  
// Search recipe functionality
// When the form is submitted, the first 10 results are displayed as cards. 
$("#search-form").on("submit", function(event){
  event.preventDefault();
  var encodedQuery = encodeURI($("#search-input").val());
  var queryURL = "https://api.spoonacular.com/recipes/search?apiKey=" + apiKey + "&query=" + encodedQuery + "&number=10";
  console.log("Submitted search with url: " + queryURL);
  searchResults = [];
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (var i = 0; i < response.results.length; i++) {
      searchResults.push(response.results[i]);
    }
    console.log(searchResults);
    $("#search-form").after("<div id=\"recipe-display\" class=\"row medium-8 large-7 columns\"></div>");
    for (var i = 0; i < searchResults.length; i++) {
      buildRecipeCard(searchResults[i]);
    }
  })
})

$(document).on("click", ".fa-times-circle", function(event) {
  event.preventDefault();
  event.stopPropagation();

  var recipeCardID = "#recipe-card-" + event.target.dataset.id;

  console.log(recipeCardID);

  $(".ingredients-list", recipeCardID).remove();

  $(".fa-times-circle", recipeCardID).addClass("fa-info-circle");
  $(".fa-info-circle", recipeCardID).removeClass("fa-times-circle");
  
})

$(document).on("click", ".fa-info-circle", function(event) {
  event.preventDefault();
  event.stopPropagation();
  var queryURL = "https://api.spoonacular.com/recipes/" + $(event.target).attr("data-id") + "/information?includeNutrition=false&apiKey=" + apiKey;
  console.log(event.target.dataset.id);

  $.ajax({
    url: queryURL, 
    method: "GET"
  }).then(function(response) {
    var recipeCardID = "#recipe-card-" + event.target.dataset.id; 
    var ingredientsList = response.extendedIngredients;

    $(".recipe-card-footer-bar", recipeCardID).before("<div class=\"ingredients-list\"></div>");
    $(".ingredients-list", recipeCardID).append("<ul><strong>Ingredients</strong></ul>");
    for (var i = 0; i < ingredientsList.length; i++) {
      $("ul", recipeCardID).append("<li>" + ingredientsList[i].original + "</li>");
    }
    $(".fa-info-circle", recipeCardID).addClass("fa-times-circle");
    $(".fa-times-circle", recipeCardID).removeClass("fa-info-circle");
  })

})
$(document).on("click", ".fa-plus", function(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log(queryURL);
  $.ajax({
    url: queryURL, 
    method: "GET"
  }).then(function(response) {
    console.log(response);
    if (localStorage.getItem("recipeList") === null) {
      var recipeList = [];
      recipeList.push("")

    }
  })
})