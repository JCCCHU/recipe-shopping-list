var apiKey = "694aebd738b243909f223ed03785609c";

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

// Basic recipe card display function
// Takes 1 argument, a basic recipe object
// Appends a completed card to the display area
function buildRecipeCard(recipe) {
  var recipeTitle = recipe.title;
  var recipeImage = recipeURL(recipe.id);
  var recipeCard = $("<div class=\"recipe-card\" id=\"recipe-card-" + recipe.id + "\"></div>");
  recipeCard.append("<div class =\"recipe-card-thumbnail\"><img src=\"" + recipeImage + "\"><h2 class=\"recipe-name\"><a href=\"#\">" + recipeTitle + "</a></h2><span class=\"recipe-source\">Recipe Source</span><div class=\"recipe-card-footer-bar\"><button href=\"#\" class=\"product-card-color-option\"><i data-id=\"" + recipe.id + "\" class=\"fas DV-show-details fa-info-circle\"></i></button><button href=\"#\" class=\"product-card-color-option\"><i data-title=\"" + recipe.title + "\" data-id=\"" + recipe.id + "\" class=\"fas add-recipe fa-plus\"></i></button></div></div>");
  $("#recipe-display").append($(recipeCard));
}

// Recipe+ingredients display function
// Takes 1 argument, a detailed recipe object
// Appends the completed card to the display area
function buildIngredientsList(recipe) {

}

// on page load

window.onload = function(){
  console.log(document.title);
  if (document.title == "Recipe List") {
    if (localStorage.getItem("recipeList") !== null) {
      var localRecipeList = JSON.parse(localStorage.getItem("recipeList"));
      
      // console.log(localRecipeList);

      for (var i = 0; i < localRecipeList.length; i++) {
        var queryURL = "https://api.spoonacular.com/recipes/" + localRecipeList[i].id + "/information?includeNutrition=false&apiKey=" + apiKey;
        // Records the local storage index of the corresponding recipe
        var recipeRow = $($.parseHTML('<tr class="table-expand-row data-open-details">'));
        var ingredientsTable = $($.parseHTML('<tr class="table-expand-row-content"><td colspan="8" class="table-expand-row-nested '+ localRecipeList[i].id + '">'));
        recipeRow.text(localRecipeList[i].title);
        recipeRow.append($.parseHTML('<td><i class="fas fa-info-circle RL-show-details fa-lg"></i><span class="expand-icon"></span></td>'));
        console.log(recipeRow.html());
        console.log(ingredientsTable.html());
        $("#recipes").append(recipeRow);
        $("#recipes").append(ingredientsTable);
        console.log(ingredientsTable.html());
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          
          var recipeEI = response.extendedIngredients;
          var ingList = $("<ul>");
          // console.log(recipeEI);
          for (var j = 0; j < recipeEI.length; j++) {
            //$("ul", ingredientsTable).append('<li><input class="ingredientItem" type="checkbox" checked><label>'+ recipeEI[i].original +'</label></li>');
            ingList.append("<li>" + recipeEI[j].original);
          }
          //console.log(ingList.html());
          $("."+response.id).html(ingList);

          // console.log("Within first then")
          // console.log(ingredientsTable);
          // return ingredientsTable;
        })
      }

    }

  }
}; 


// Search recipe functionality
// When the form is submitted, the first 10 results are displayed as cards. 
$("#search-form").on("submit", function(event){
  event.preventDefault();
  var encodedQuery = encodeURI($("#search-input").val());
  var queryURL = "https://api.spoonacular.com/recipes/search?apiKey=" + apiKey + "&query=" + encodedQuery + "&number=10";
  searchResults = [];
  $("#recipe-display").remove();
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (var i = 0; i < response.results.length; i++) {
      searchResults.push(response.results[i]);
    }
    $("#search-form").after("<div id=\"recipe-display\" class=\"row medium-8 large-7 columns\"></div>");
    for (var i = 0; i < searchResults.length; i++) {
      buildRecipeCard(searchResults[i]);
    }
  })
})

// When clicking an (x) on the Default View pages
$(document).on("click", ".DV-hide-details", function(event) {
  event.preventDefault();
  event.stopPropagation();
  var recipeCardID = "#recipe-card-" + event.target.dataset.id;
  $(".ingredients-list", recipeCardID).remove();
  $(".fa-times-circle", recipeCardID).addClass("fa-info-circle DV-show-details");
  $(".fa-info-circle", recipeCardID).removeClass("fa-times-circle DV-hide-details");
})

// When clicking an (!) on the Default View page
$(document).on("click", ".DV-show-details", function(event) {
  event.preventDefault();
  event.stopPropagation();
  var queryURL = "https://api.spoonacular.com/recipes/" + $(event.target).attr("data-id") + "/information?includeNutrition=false&apiKey=" + apiKey;
  $.ajax({
    url: queryURL, 
    method: "GET"
  }).then(function(response) {
    //console.log(response);
    var recipeCardID = "#recipe-card-" + event.target.dataset.id; 
    var ingredientsList = response.extendedIngredients;
    $(".recipe-card-footer-bar", recipeCardID).before("<div class=\"ingredients-list\"></div>");
    $(".ingredients-list", recipeCardID).append("<ul><strong>Ingredients</strong></ul>");
    for (var i = 0; i < ingredientsList.length; i++) {
      $("ul", recipeCardID).append("<li>" + ingredientsList[i].original + "</li>");
    }
    $(".fa-info-circle", recipeCardID).addClass("DV-hide-details fa-times-circle");
    $(".DV-hide-details", recipeCardID).removeClass("DV-show-details fa-info-circle");
  })
})

// When (+) is clicked on the Default View page
$(document).on("click", ".add-recipe", function(event) {
  event.preventDefault();
  event.stopPropagation();
  if (localStorage.getItem("recipeList") === null) {
    var recipeList = [];
    recipeList.push({
      title: $(event.target).attr("data-title"),
      id: $(event.target).attr("data-id")
    });
    localStorage.setItem("recipeList",JSON.stringify(recipeList));
    alert("Added " + $(event.target).attr("data-title") + " to the recipe list.");
  } else {
    var recipeExists = false;
    var recipeList = JSON.parse(localStorage.getItem("recipeList"));
    var recipeToAdd = {
      title: $(event.target).attr("data-title"),
      id: $(event.target).attr("data-id")
    };
    for (var i = 0; i < recipeList.length; i++) {
      if (recipeList[i].id === recipeToAdd.id) {
        recipeExists = true;
        break;
      }
    }
    if (recipeExists) {
      if (confirm("Recipe already exists in the shopping list. Add again?")) {
        recipeList.push(recipeToAdd);
        localStorage.setItem("recipeList",JSON.stringify(recipeList));
        alert("Added another " + $(event.target).attr("data-title") + " to the recipe list.");
      }
    } else {
      recipeList.push(recipeToAdd);
      localStorage.setItem("recipeList",JSON.stringify(recipeList));
      alert("Added " + $(event.target).attr("data-title") + " to the recipe list.");

    }
  }
})

// recipe-list.html
$(document).on('click','.data-open-details', function (e) {
  e.preventDefault();
  $(this).next().toggleClass('is-active');
  $(this).toggleClass('is-active');
});

$(document).on('click','#shoppingButton', function(event) {
  event.preventDefault();
  
});