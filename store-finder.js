// API call for Google Maps, and setting the variables for the empty Postal Code input box

var Api_key = `AIzaSyAjqVRX4XuJzeIj2YPRD7X6Sx_hMV8f32I`;
var postalCodeEl = $("#postal-code-input");

// the function to build the card that holds the name of the grocery store and location
// function buildRecipeCard(recipe) {
//   var recipeTitle = dataLocation.results[i].name;
//   var recipeImage = dataLocation.results[i].vicinity;
//   var recipeCard = $("<div class=\"recipe-card\" id=\"recipe-card-" + "\"></div>");
//   recipeCard.append("<div class =\"recipe-card-thumbnail\"><h2 class=\"recipe-name\"><a href=\"#\">" + recipeTitle + "</a></h2><span class=\"recipe-source\">" + recipeImage + "</span></div>");
//   $("#recipe-display").append($(recipeCard));
// }

// the function to call on the user input from the postal code form and call on the Google API
$("#postal-code-form").on("submit", function storeFinder(stores) {
  event.preventDefault();
  var postalCode = postalCodeEl.val();
  fetch(
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' +
    postalCode +
    '&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=' +
    Api_key
)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    return data.candidates[0].geometry.location;
  })
  .then(function(location) {
    return fetch(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
        location.lat +
        ',' +
        location.lng +
        '&radius=1500&type=supermarket&key=' +
        Api_key
    );
  })
  .then(function(resLocation) {
    return resLocation.json();
  })

  .then(function(dataLocation) {
    for (var i = 0; i < dataLocation.results.length; i++) {
      console.log(dataLocation.results[i].name);
      console.log(dataLocation.results[i].vicinity);
      console.log(dataLocation.results[i].id);
    }
    console.log(dataLocation);

    $("#postal-code-form").after("<div id=\"recipe-display\" class=\"row medium-8 large-7 columns\"></div>");
    for (var i = 0; i < dataLocation.results.length; i++) {

      var recipeTitle = dataLocation.results[i].name;
      var recipeImage = dataLocation.results[i].vicinity;
      var recipeCard = $("<div class=\"store-card\" id=\"recipe-card-" + "\"></div>");
      recipeCard.append("<div class =\"recipe-card-thumbnail\"><h2 class=\"recipe-name\">" + recipeTitle + "</h2><span class=\"recipe-source\">" + recipeImage + "</span></div>");
      $("#recipe-display").append($(recipeCard));
    }
  });
});

