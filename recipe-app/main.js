import './style.css'

//New recipes from local storage
function newRecipesFromLocalStorage() {
  let newRecipes = []
  if (localStorage.newRecipes) {
    newRecipes = JSON.parse(localStorage.newRecipes)
  }
}

document.querySelector('#app').innerHTML = `
  <div>
  </div>
`
