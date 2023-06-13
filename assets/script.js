var drinkInput = $('#drink-search');
var drinkSearchButton = document.getElementById('drink-search-button');

var spiritInput = $('#spirit-search');
var spiritSearchButton = document.getElementById('spirit-search-button');
var drinkapivar;

// API call for drink search
drinkSearchButton.addEventListener("click", function (drink) {
  var drink = drinkInput.val().trim();

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(response => response.json())
    .then(data => {
      // Handle the response data
      console.log(data); // You can modify this to do something with the data
      displayDrinkRecipeUl(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.log('Error:', error);
    });
});

// API call for spirit search
spiritSearchButton.addEventListener("click", function (spirit) {
  var spirit = spiritInput.val().trim();

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${spirit}`)
    .then(response => response.json())
    .then(data => {
      // Handle the response data
      console.log(data); // You can modify this to do something with the data
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.log('Error:', error);
    });
});

var generateFact = document.getElementById("generate-fact");

// API call for random fact
generateFact.addEventListener("click", function () {
  fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displayFact(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
});

// Display text for random fact
function displayFact(data) {
  var factContainer = document.querySelector(".fact-container");
  factContainer.innerHTML = "";

  var fact = document.createElement("p");
  fact.textContent = data.text;
  factContainer.append(fact);
};

function displayDrinkRecipeUl(data) {
  var drinkRecipeContainer = document.querySelector(".drink-recipe-container");
  drinkRecipeContainer.innerHTML = "";

  for (var i = 0; i < data.drinks.length; i++) {
    var drinkButtonContainer = document.createElement("ul");
    drinkButtonContainer.setAttribute("class", "collapsible col s12");

    var drinkButtonItem = document.createElement("li");

    var drinkButtonHeader = document.createElement("div");
    drinkButtonHeader.textContent = data.drinks[i].strDrink;
    drinkButtonHeader.setAttribute("class", "collapsible-header");
    drinkButtonHeader.setAttribute("id", data.drinks[i].idDrink);
    console.log(drinkButtonHeader.id);
    var drinkButtonBody = document.createElement("div");
    drinkButtonBody.setAttribute("class", "collapsible-body");

    drinkButtonContainer.append(drinkButtonItem);
    drinkButtonItem.append(drinkButtonHeader);
    drinkButtonItem.append(drinkButtonBody);
    drinkRecipeContainer.append(drinkButtonContainer);

    drinkButtonHeader.addEventListener("click", function (e) {
      var drink = e.target.textContent;
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          displayDrinkRecipe(data);
        });
    });
  }



  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems);
  });
}

function displayDrinkRecipe(data) {
  var drinkButtonBody = document.querySelector(".collapsible-body");
  drinkButtonBody.innerHTML = "";

  var drinkName = document.createElement("h4");
  drinkName.textContent = data.drinks[0].strDrink;

  var drinkIngredients = document.createElement("ul");
  for (var i = 1; i <= 15; i++) {
    var ingredient = data.drinks[0][`strIngredient${i}`];
    var measure = data.drinks[0][`strMeasure${i}`];

    if (ingredient) {
      var ingredientItem = document.createElement("li");
      ingredientItem.textContent = `${ingredient} - ${measure}`;
      drinkIngredients.append(ingredientItem);
    }
  }

  drinkButtonBody.append(drinkName, drinkIngredients);
}

// Display recipe on click
function displayDrinkRecipe(data) {
  var drinkButtonBody = document.querySelector(".collapsible-body");

  var ingredientContainer = document.createElement("ul");
  var ingredient1 = document.createElement("li");
  var ingredient2 = document.createElement("li");
  var ingredient3 = document.createElement("li");
  var ingredient4 = document.createElement("li");
  var ingredient5 = document.createElement("li");
  var ingredient6 = document.createElement("li");
  var ingredient7 = document.createElement("li");
  var ingredient8 = document.createElement("li");
  var ingredient9 = document.createElement("li");
  var ingredient10 = document.createElement("li");
  var ingredient11 = document.createElement("li");
  var ingredient12 = document.createElement("li");
  var ingredient13 = document.createElement("li");
  var ingredient14 = document.createElement("li");
  var ingredient15 = document.createElement("li");

  ingredient1.textContent = `${data.drinks[0].strMeasure1} ${data.drinks[0].strIngredient1}`;
  console.log(ingredient1);

  drinkButtonBody.append(ingredientContainer);
  ingredientContainer.appendChild(ingredient1);


  var elems = document.querySelectorAll(".collapsible");
  var instances = M.Collapsible.init(elems);


};





// Get references to the input and button elements
var ingredientInput = document.getElementById("ingredient-input");
var addButton = document.getElementById("add-button");
var ingredientsOnHand = document.getElementById("shopping-list");
// added ingredients array
var ingredientsArray = [];

// Add event listener to the button
addButton.addEventListener("click", function () {
  // Get the input value
  var ingredient = ingredientInput.value;

  // Create a new list item
  var li = document.createElement("li");


  // Create a span for the ingredient text

  // Create a span for the ingredient text
  var ingredientSpan = document.createElement("span");
  ingredientSpan.textContent = ingredient;

  // pushing to ingredients array
  ingredientsArray.push(ingredientInput.value);

  // Create a button for removing the item
  var removeButton = document.createElement("button");
  removeButton.textContent = "x";
  removeButton.style.color = "red";
  removeButton.addEventListener("click", function () {
    // Remove the corresponding list item when clicked
    ingredientsOnHand.removeChild(li);
  });

  // Add a space between the ingredient and the remove button
  var space = document.createTextNode(" ");

  // Append the ingredient, space, and remove button to the list item
  li.appendChild(ingredientSpan);
  li.appendChild(space);
  li.appendChild(removeButton);

  // Add the list item to the shopping list
  ingredientsOnHand.appendChild(li);


  // Clear the input field
  ingredientInput.value = "";


});

console.log(ingredientsArray);

// button to show possible cocktials
var showButton = document.getElementById("show-button");


// fuction for show possible drinks click
showButton.addEventListener("click", function () {
});


const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

// Function to fetch cocktails for a specific letter
async function fetchCocktailsByLetter(letter) {
  const response = await fetch(apiUrl + letter);
  const data = await response.json();
  return data.drinks || []; // Return an empty array if there are no drinks
}

// Function to fetch all cocktails
async function fetchAllCocktails() {
  const allCocktails = [];

  for (const letter of alphabet) {
    const cocktails = await fetchCocktailsByLetter(letter);
    allCocktails.push(...cocktails);
  }

  return allCocktails;
}

// Call the fetchAllCocktails function
fetchAllCocktails()
  .then(cocktails => {
    console.log(cocktails); // Array of all cocktails
    console.log('Total cocktails:', cocktails.length); // Total number of cocktails
  })
  .catch(error => {
    console.log('Error:', error);
  });

// for (let i = 0; i < length.allCocktails; i++) {

//   var test = allCocktails[i].strIngredient1;
//   console.log(test);



// }





