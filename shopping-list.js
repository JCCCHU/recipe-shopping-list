// var todoInput = document.querySelector("#todo-text");
// var todoForm = document.querySelector("#todo-form");
// var todoList = document.querySelector("#todo-list");

// our input field
var input = document.querySelector("#addItemtoShoppingList");
// our add button
var addToList = document.querySelector("#addButton");
// our new ingredient item 
var newIngredientItem = document.querySelector("#newIngredientItem");




// our empty ingredient list 
var ingredients = [];

renderTodos();

function renderTodos() {
  // Clear todoList element and update todoCountSpan
  // newIngredientItem.innerHTML = "";
  // todoCountSpan.textContent = todos.length;

  // Render a new li for each added ingredient 
  for (var i = 0; i < ingredients.length; i++) {
    var item = ingredients[i];

    
    var li = document.createElement("li");
    li.textContent = item;
    newIngredientItem.appendChild(li);
  }
}

// When form is submitted...

document.getElementById("addButton").onclick = function() {addIngredientItem()};

// addToList.addEventListener("submit", function(event) {
//   event.preventDefault();

function addIngredientItem(){

  var itemText = input.value.trim();

  // Return from function early if submitted todoText is blank
  if (itemText === "") {
    return;
  }``

  // Add new todoText to todos array, clear the input
  ingredients.push(itemText);
  input.value = "";

  // Re-render the list
  renderTodos();
};