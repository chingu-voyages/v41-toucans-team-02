import './style.css'

//Favorite list from local storage
function favoritesListFromLocalStorage() {
  let favoritesList = []
  if (localStorage.favoritesList) {
    favoritesList = JSON.parse(localStorage.favoritesList)
  }
}

document.querySelector('#app').innerHTML = `
  <div>
    
  </div>
`

setupCounter(document.querySelector('#counter'))
