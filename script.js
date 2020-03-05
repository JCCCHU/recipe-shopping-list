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
function recipeImage(recipeID) {
  return ("https://spoonacular.com/recipeImages/" + recipeID + "-312x231.jpg");
  
}

// UNFINISHED
// Ingredient list function
// Takes 1 argument, an object of 'recipe info information'
// Outputs an array with the list of 'ingredient' objects
function ingredientList(recipeInfo) {

}

//
$("#searchForm").on("submit", function(event){
  event.preventDefault();
  event.stopPropagation();
  
  var encodedQuery = encodeURI($("#searchInput").val());
  var queryURL = "https://api.spoonacular.com/recipes/search?apiKey=" + apiKey + "&query=" + encodedQuery + "&number=10";
  searchResults = [];
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log("2"+response);
    for (var i = 0; i < response.results.length; i++) {
      searchResults.push(response.results[i]);
    }
    $("#results").empty();
    for (var i = 0; i < searchResults.length; i++) {
      $("#results").append("<p>Title: " + searchResults[i].title + "</p>");
      $("#results").append("<img src=\"" + recipeImage(searchResults[i].id) + "\"><br>");
      // Saves the recipe ID in a data attribute
      $("#results").append("<button data-id=" + searchResults[i].id + " class=\"detailedRecipeButton\">View details</button>");
    }
    
  })
})

$("#results").on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();

  console.log(event.target);

  // Detects if whats clicked had a data attribute. Currently only the "View details" button should have a data-id attribute.
  if($(event.target).attr("data-id")) {

    // Uses the data attribute of the clicked button to build the query URL
    var queryURL = "https://api.spoonacular.com/recipes/" + $(event.target).attr("data-id") + "/information?includeNutrition=false&apiKey=" + apiKey;

    console.log(queryURL);

    $.ajax({
      url: queryURL, 
      method: "GET"
    }).then(function(response) {
      console.log(response);

      // Supposed to clear the search results. Currently doesn't work
      $("#results").remove();
      $("#searchForm").after("<div id=\"results\"></div>");
      $("#results").append("<p>Title: " + response.title + "</p>");
      $("#results").append("<img src=\"" + recipeImage(response.id) + "\">");
      $("#results").append("<p>Ingredients</p><br>");
      for (var i = 0; i < response.extendedIngredients.length; i++) {
        $("#results").append("<p>" + response.extendedIngredients[i].name + "</p>");
      }
    })
  }

  

})



/*
$.ajax({
  url:recipiesWithIngredients,
  method: "GET"
}).then(function(response) {
  console.log(response);
})
*/


/*
// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  var movie = $(this).attr("data-name");
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creating a div to hold the movie
    var movieDiv = $("<div class='movie'>");

    // Storing the rating data
    var rating = response.Rated;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    movieDiv.append(pOne);

    // Storing the release year
    var released = response.Released;

    // Creating an element to hold the release year
    var pTwo = $("<p>").text("Released: " + released);

    // Displaying the release year
    movieDiv.append(pTwo);

    // Storing the plot
    var plot = response.Plot;

    // Creating an element to hold the plot
    var pThree = $("<p>").text("Plot: " + plot);

    // Appending the plot
    movieDiv.append(pThree);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    movieDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#movies-view").prepend(movieDiv);
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("movie-btn");
    // Adding a data-attribute
    a.attr("data-name", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-movie").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // Adding movie from the textbox to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".movie-btn", displayMovieInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();*/