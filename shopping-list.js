// our input field
var input = document.querySelector("#addItemtoShoppingList");
// our add button
var addToList = document.querySelector("#addButton");
// our new ingredient item 
var newIngredientItem = document.querySelector("#newIngredientItem");
var addForm = document.querySelector(".addIngredient");
var clearAllIngredients = document.querySelector("removePurchasedItemsBtn");


// our empty ingredient list 
var ingredients = [];

$(document).ready(function() {
  renderShopping();
})

function renderShopping() {
  $("#newIngredientItem").html("");
  if (localStorage.getItem("shopping") === null) {
    $("#newIngredientItem").append("<p>There are no ingredients in the basket.</p>");
  } else {
    var localShopping = JSON.parse(localStorage.getItem("shopping"));
    console.log(localShopping);
    for (var i = 0; i < localShopping.length; i++) {
      $("#newIngredientItem").append('<input id="strikethrough" type="checkbox" value="1" name="ingredientItem"><label>' + localShopping[i] + '</label><br>');
    }
  }
}



// When enter or add is submitted...
addForm.addEventListener("submit", function addIngredientItem(event){
  event.preventDefault();
  console.log("Add form");
  var itemText = input.value.trim();

  // Return from function early if submitted ingrient is blank
  if (itemText === "") {
    return;
  }
  if (localStorage.getItem("shopping") === null) {
    localStorage.setItem("shopping",JSON.stringify([itemText]));
  } else {
    var localShopping = JSON.parse(localStorage.getItem("shopping"));
    localShopping.push(itemText);
    localStorage.setItem("shopping",JSON.stringify(localShopping));
  }

  input.value = "";

  // Re-render the list
  renderShopping();
});

// to clear all ingredients
// clearAllIngredients.addEventListener("submit", function addIngredientItem(event){
//   event.preventDefault();

document.getElementById("removePurchasedItemsBtn").onclick = function() {clearIngredients()};

function clearIngredients (){
  localStorage.removeItem("shopping");
  renderShopping();
}


