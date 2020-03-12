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

function addNewIngredientItem() {
  // Clear ingredient element
  newIngredientItem.innerHTML = "";
  // Render a new li for each added ingredient 
  for (var i = 0; i < ingredients.length; i++) {
    var item = ingredients[i];
    
    var li = document.createElement("li");
    var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.value = 1;
      checkbox.name = "ingredientItem";
      checkbox.id = "strikethrough";
    var labelName = document.createElement('label');
      labelName.innerHTML = item
      linebreak = document.createElement("br");

    li.setAttribute("type", "checkbox");
    li.textContent = item;
      newIngredientItem.appendChild(checkbox);
      newIngredientItem.appendChild(labelName);
      newIngredientItem.appendChild(linebreak);
  }};



// When enter or add is submitted...
addForm.addEventListener("submit", function addIngredientItem(event){
  event.preventDefault();
 
  var itemText = input.value.trim();

  // Return from function early if submitted ingrient is blank
  if (itemText === "") {
    return;
  }

  // Add new new ingredient item to ingredient array, clear the input
  ingredients.push(itemText);
  input.value = "";

  // Re-render the list
  addNewIngredientItem();
});

// to clear all ingredients
// clearAllIngredients.addEventListener("submit", function addIngredientItem(event){
//   event.preventDefault();

  document.getElementById("removePurchasedItemsBtn").onclick = function() {clearIngredients()};

function clearIngredients (){
  newIngredientItem.innerHTML = "";
  ingredients = [];
}


