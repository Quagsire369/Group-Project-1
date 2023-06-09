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