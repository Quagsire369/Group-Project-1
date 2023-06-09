fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then(response => response.json())
  .then(data => {
    // Handle the response data
    console.log(data); // You can modify this to do something with the data
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.log('Error:', error);
  });

  // Get references to the input and button elements
var ingredientInput = document.getElementById("ingredientInput");
var addButton = document.getElementById("addButton");
var shoppingList = document.getElementById("shoppingList");

// Add event listener to the button
addButton.addEventListener("click", function() {
  // Get the input value
  var ingredient = ingredientInput.value;
  
  // Create a new list item
  var li = document.createElement("li");
  var textNode = document.createTextNode(ingredient);
  li.appendChild(textNode);
  
  // Add the list item to the shopping list
  shoppingList.appendChild(li);
  
  // Clear the input field
  ingredientInput.value = "";
});