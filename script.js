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
  var recipeCard = $("<div class=\"recipe-card\"></div>");
  recipeCard.append("<div class =\"recipe-card-thumbnail\"><img src=\"" + recipeImage + "\"><h2 class=\"recipe-name\"><a href=\"#\">" + recipeTitle + "</a></h2><span class=\"recipe-source\">Recipe Source</span><div class=\"recipe-card-footer-bar\"><button href=\"#\" class=\"product-card-color-option\"><i data-id=\"" + recipe.id + "\" class=\"fas fa-info-circle\"></i></button><button href=\"#\" class=\"product-card-color-option\"><i data-id=\"" + recipe.id + "\" class=\"fas fa-plus\"></i></button></div></div>");
  $("#recipe-display").append($(recipeCard));
}

// Full recipe card display function
// Takes 1 argument, a detailed recipe object
// Appends the completed recipe to the display area
function buildIngredientsCard(recipe) {
  var recipeTitle = recipe.title;
  var recipeImage = recipeURL(recipe.id);
  var recipeCard = $("<div class=\"recipe-card\"></div>");

  $(recipeCard).append("<div class=\"recipe-card-thumbnail\"><img src=\"" + recipeImage + "\"></div>");
  $(recipeCard).append("<h2 class=\"recipe-name\">" + recipeTitle + "</h2>");
  $(recipeCard).append("<span class=\"recipe-source\">Recipe Source\"</span>");
  $(recipeCard).append("<div class=\"recipe-ingredients\">Ingredients:<ul></ul>");
  
  // Appends each ingredient to an unordered list
  for (var i = 0; i < recipe.extendedIngredients.length; i++) {
    var ingredient = recipe.extendedIngredients[i];
    var ingredientLI = $("<li class=\"ingredient-LI\">" + ingredient.original + "</li>");
        
    $(recipeCard).find("ul").append(ingredientLI);
  }
  $("#recipe-display").append(recipeCard);
}

// 
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
$(document).on("click", ".fa-info-circle", function(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log(event.target);
  alert("Clicked fa-info-circle");
    var queryURL = "https://api.spoonacular.com/recipes/" + $(event.target).attr("data-id") + "/information?includeNutrition=false&apiKey=" + apiKey;

    $.ajax({
      url: queryURL, 
      method: "GET"
    }).then(function(response) {
      
      console.log(response);

      $("#recipe-display").remove();
      $("#search-form").after("<div id=\"recipe-display\" class=\"row medium-8 large-7 columns\"></div>");
      buildIngredientsCard(response); 
    })
})
$(document).on("click", ".fa-plus", function(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log(event.target);
  if($(event.target).hasClass("fa-plus")) {
    alert("Clicked fa-plus");
    // Uses the data attribute of the clicked button to build the query URL

    console.log(queryURL);

    $.ajax({
      url: queryURL, 
      method: "GET"
    }).then(function(response) {
      
      console.log(response);
      
    })
  }

})