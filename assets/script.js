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
  
  // Create a span for the ingredient text
  var ingredientSpan = document.createElement("span");
  ingredientSpan.textContent = ingredient;
  
  // Create a button for removing the item
  var removeButton = document.createElement("button");
  removeButton.textContent = "x";
  removeButton.style.color = "red";
  removeButton.addEventListener("click", function() {
    // Remove the corresponding list item when clicked
    shoppingList.removeChild(li);
  });
  
  // Add a space between the ingredient and the remove button
  var space = document.createTextNode(" ");
  
  // Append the ingredient, space, and remove button to the list item
  li.appendChild(ingredientSpan);
  li.appendChild(space);
  li.appendChild(removeButton);
  
  // Add the list item to the shopping list
  shoppingList.appendChild(li);
  
  // Clear the input field
  ingredientInput.value = "";
});
