var drinkInput = $('#drink-search');
var drinkSearchButton = document.getElementById('drink-search-button');

var spiritInput = $('#spirit-search');
var spiritSearchButton = document.getElementById('spirit-search-button');
var drinkapivar;
var advancedApiUrl;

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

//Display the unordered list of drink results and create the collapsible structure
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

    var drinkButtonBody = document.createElement("div");
    drinkButtonBody.setAttribute("class", "collapsible-body");
    drinkButtonBody.setAttribute("id", data.drinks[i].idDrink);

    drinkButtonContainer.append(drinkButtonItem);
    drinkButtonItem.append(drinkButtonHeader);
    drinkButtonItem.append(drinkButtonBody);
    drinkRecipeContainer.append(drinkButtonContainer);

    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, {});

    drinkButtonHeader.addEventListener("click", function (e) {
      var drink = e.target.textContent;

      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);

          displayDrinkRecipe(data);
        });
    });
  };
};

// Display recipe on collapsible header click
function displayDrinkRecipe(data) {
  var drinkButtonBody = document.getElementById(data.drinks[0].idDrink);

  var ingredientContainer = document.createElement("ul");

  // Clear existing contents of ingredientContainer
  ingredientContainer.innerHTML = '';

  //Loop to go through all possible ingredients and measurments
  for (var i = 1; i <= 15; i++) {
    var ingredient = data.drinks[0][`strIngredient${i}`];
    var measure = data.drinks[0][`strMeasure${i}`];



    if (!measure || measure === "null") {
      measure = ""; // Set an empty string for null or "null" measurements
    }

    if (!ingredient) {
      break; // Stop appending if ingredient is null
    }

    var ingredientItem = document.createElement("li");
    ingredientItem.textContent = `${measure} ${ingredient}`;
    ingredientContainer.append(ingredientItem);

  

  };
  //append instructions to ingredient container
  var instructions = data.drinks[0].strInstructions;
  var instructionsItem = document.createElement("blockquote");
  instructionsItem.textContent = instructions;
  ingredientContainer.append(instructionsItem);

  var thumbNail = data.drinks[0].strDrinkThumb;
  var thumbNailElement = document.createElement("img");
  thumbNailElement.src = thumbNail;
  thumbNailElement.style.height = '150px';
  ingredientContainer.append(thumbNailElement);

  // Clear existing contents of drinkButtonBody
  drinkButtonBody.innerHTML = '';
  drinkButtonBody.append(ingredientContainer);
};

// Get references to the input and button elements

var ingredientInput = document.getElementById("ingredient-input");
var addButton = document.getElementById("add-button");
var ingredientsOnHand = document.getElementById("shopping-list");

// Added ingredients array
var ingredientsArray = [];
var allIngredients = ingredientsArray;

// Add event listener to the button
addButton.addEventListener("click", function () {
  // Get the input value
  var ingredient = ingredientInput.value;

  // Create a new list item
  var li = document.createElement("li");
  li.style.marginBottom = "10px";

  // Create a span for the ingredient text
  var ingredientSpan = document.createElement("span");
  ingredientSpan.textContent = ingredient;

  // Pushing to ingredients array
  ingredientsArray.push(ingredientInput.value);

  // Updates ingredients array, joining all strings with commas
  allIngredients = ingredientsArray.join(",");

  // Updates advancedApiUrl API call with ingredient input values in all ingredients array
  advancedApiUrl = `HTTPS://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${handleApiUrlSpaces(allIngredients)}`;
  console.log(ingredientsArray);
  console.log(allIngredients);

  // Create a button for removing the item
  var removeButton = document.createElement("i");
  removeButton.classList.add("material-icons");
  removeButton.textContent = "cancel";
  removeButton.style.float = "right";
  // removeButton.style.color = "red";
  removeButton.addEventListener("click", function () {
    // Remove the corresponding list item when clicked
    ingredientsOnHand.removeChild(li);


    // Remove the specific ingredient from the ingredientsArray
    var index = ingredientsArray.indexOf(ingredient);
    
    ingredientsArray.splice(index, 1);
    allIngredients = ingredientsArray;

    advancedApiUrl = `HTTPS://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${handleApiUrlSpaces(allIngredients)}`;
    console.log(ingredientsArray);

    
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

// Button to show possible cocktials
var showButton = document.getElementById("show-button");

// Adds event listener for click on show possible cocktails button, makes API call for multifactor ingredients list
showButton.addEventListener("click", function () {
  
  getMultiFactor();
});



// Makes API call for ingredient inputs
function getMultiFactor() {

  console.log(advancedApiUrl);
  fetch(advancedApiUrl)
    .then(response => response.json())
    .then(data => {
      console.log("multifactor", data);
      displayDrinkRecipeUl(data);
    });
    
};

// Finds spaces in ingredient inputs and replaces with underscores
function handleApiUrlSpaces(str) {
  let newstr = "";
  for (i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      newstr += "_";
    } else {
      newstr += str[i];
    };
  };
  return newstr;
};