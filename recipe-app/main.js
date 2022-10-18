import './style.css'

// Recipes add to local storage
function recipesAddToLocalStorage() {
  let recipes = [];
  localStorage.recipes = JSON.stringify(recipes);
}

// Favorites add to local storage
function favoritesAddToLocalStorage() {
  let favorites = [];
  localStorage.favorites = JSON.stringify(favorites);
}

document.querySelector('#app').innerHTML = `
  <div>
  </div>
`
