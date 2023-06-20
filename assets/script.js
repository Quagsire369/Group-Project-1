var drinkInput = $('#drink-search');
var drinkSearchButton = document.getElementById('drink-search-button');
var centerContent = document.getElementById('centerContent')
var spiritInput = $('#spirit-search');
var spiritSearchButton = document.getElementById('spirit-search-button');
var drinkapivar;
var advancedApiUrl;

//side bar nav initialzation
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {edge:"right"});
});

// Dropdown initialization on click
$(".dropdown-trigger").dropdown({hover: false});

//Modal initialization
$(document).ready(function () {
  $('.modal').modal();
});

// API call for drink search
drinkSearchButton.addEventListener("click", function (drink) {
  var drink = drinkInput.val().trim();

  if (drink === "") {
    return;
  }

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
      centerContent.textContent = "Sorry there were no results for your search, please try again."
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
    drinkButtonContainer.classList.add("collapsible", "col", "s12");

    var drinkButtonItem = document.createElement("li");

    var drinkButtonHeader = document.createElement("div");
    drinkButtonHeader.textContent = data.drinks[i].strDrink;
    drinkButtonHeader.classList.add("collapsible-header");

    var drinkButtonBody = document.createElement("div");
    drinkButtonBody.classList.add("collapsible-body");
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

        $(".material-icons").on('click', function() {
          
          if (savedCocktailsArr.includes(`${drink}`)) {
            savedCocktailsArr = savedCocktailsArr;
          } else {
          savedCocktailsArr.push(`${drink}`);
          console.log(savedCocktailsArr);
          }
          saveMyCocktails(data);
          getMyCocktails();
          displayMyCocktails();
        });
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

  var myCocktailBtn = document.createElement("a");
  
  myCocktailBtn.classList.add("btn-floating", "pulse", "right", "bottom");

  var myCocktailIcon= document.createElement("i");
  myCocktailIcon.textContent = "add";
  myCocktailIcon.classList.add("material-icons");
  myCocktailIcon.setAttribute("id", "my-cocktail-button")


  myCocktailBtn.appendChild(myCocktailIcon);
  ingredientContainer.append(myCocktailBtn);

  // Clear existing contents of drinkButtonBody
  drinkButtonBody.innerHTML = '';
  drinkButtonBody.append(ingredientContainer);
};

// Get references to the input and button elements
var ingredientInput = document.getElementById("ingredient-input");
var addButton = document.getElementById("add-button");
var ingredientsOnHand = document.getElementById("shopping-list");
var restartButton = document.getElementById("restart-button")

// Added ingredients array
var ingredientsArray = [];
var allIngredients = ingredientsArray;

document.addEventListener('DOMContentLoaded', function() {
  restartButton.addEventListener('click', function() {
    console.log(restartButton);
    ingredientsOnHand.innerHTML = '';
    ingredientsArray.length = 0;
    allIngredients = '';
    advancedApiUrl = '';
  });
});

// Add event listener to the button
addButton.addEventListener("click", function () {
  // Get the input value
  var ingredient = ingredientInput.value;

  if (ingredient === "") {
    return;
  }
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

  // Create a button for removing the item
  var removeButton = document.createElement("i");
  removeButton.classList.add("material-icons");
  removeButton.textContent = "cancel";
  removeButton.style.float = "right";

  removeButton.addEventListener("click", function () {
    // Remove the corresponding list item when clicked
    ingredientsOnHand.removeChild(li);


    // Remove the specific ingredient from the ingredientsArray
    var index = ingredientsArray.indexOf(ingredient);

    ingredientsArray.splice(index, 1);
    allIngredients = ingredientsArray;
    allIngredients = ingredientsArray.join(",");
    advancedApiUrl = `HTTPS://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${handleApiUrlSpaces(allIngredients)}`;
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
  if (ingredientsArray.length === 0) {
    return;
  }
  getMultiFactor();
});

// Makes API call for ingredient inputs
function getMultiFactor() {

  console.log(advancedApiUrl);
  fetch(advancedApiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.drinks === "None Found") {
        centerContent.textContent = "Please simplify or alter your ingredients. There are no drinks made with all of your ingredients."
        return;
      }
      centerContent.textContent = "";
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

// Array to store saved drinks in local storage
var savedCocktailsArr = [];

// Sets array to local storage
function saveMyCocktails () {
  localStorage.setItem("savedCocktailsArr", JSON.stringify(savedCocktailsArr));
};

// Gets/updates array with new info
function getMyCocktails() {
  var update = JSON.parse(localStorage.getItem("savedCocktailsArr"));

  if (update) {
    savedCocktailsArr = update;
  };
};

getMyCocktails();

function displayMyCocktails() {
  var searchItemUl = document.getElementById("dropdown1");
  console.log(savedCocktailsArr);

  searchItemUl.innerHTML = "";

  for (var i = 0; i < savedCocktailsArr.length; i++) {

    var searchItem = document.createElement("li");
    searchItem.textContent = savedCocktailsArr[i];

    searchItemUl.appendChild(searchItem);

    // remove button for myCocktail
    // var btnContainer = document.createElement("div");
    // searchItemUl.appendChild(btnContainer);
    // var btnContainer = document.createElement("div");
    // var removeMyCocktailBtn = document.createElement("i");
    // removeMyCocktailBtn.classList.add("material-icons", "right");
    // removeMyCocktailBtn.textContent = "remove_circle";
    // btnContainer.append(removeMyCocktailBtn)
    // searchItem.appendChild(btnContainer);

    searchItem.addEventListener("click", function (e) {
      // changed the drink variable to exclude the nested span with childNodes
      var drink = e.target.textContent;
      // console.log("this should say remove circle" ,drink);

      // var index = savedCocktailsArr.indexOf(searchItem);
      // if (drink === "remove_circle") {
      //   savedCocktailsArr.splice(index, 1);
      //   console.log("this is what we are looking at", savedCocktailsArr);
      //   console.log("this is index", index)
      //   console.log("search item", searchItem.textContent)
      //   saveMyCocktails();
      //   getMyCocktails();
      // };
      

      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(response => response.json())
        .then(data => {
        // Handle the response data
        console.log(data); // You can modify this to do something with the data

      displayDrinkRecipeUl(data);
      });
    });
  };
};

displayMyCocktails();



// var myCocktailsLink = document.getElementById("my-cocktails");

// function displayMyCocktails() {
  
//   myCocktailsLink.addEventListener("click", function() {
//     var myCocktailsArr = [];

//     for (var i = 0; i < savedCocktailsArr.length; i++) {
//     fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${savedCocktailsArr[i]}`)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         for (var i = 0; i < savedCocktailsArr.length; i ++) {
//           var obj = {};
//           // if (myCocktailsArr.includes(data.drinks[0])) {
//           //   myCocktailsArr = myCocktailsArr;
//           // } else {
//           //   myCocktailsArr.push(data.drinks[0]);
//           // };
//           obj = data;
//           console.log("this", obj);
//           myCocktailsArr.push(obj);
//         };
//         console.log(myCocktailsArr);
        
//       });
//     };
//     console.log(myCocktailsArr);
//     displayDrinkRecipeUl(...myCocktailsArr);
//   });
// };

// displayMyCocktails();