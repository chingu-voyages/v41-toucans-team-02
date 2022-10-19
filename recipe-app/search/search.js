import "./search.scss";
import "../style.css"


const searchInput = document.getElementById("searchBar");

searchInput.addEventListener("change" , e => {
    const value = e.target.value
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e4fc131d73msh74dadea2998f674p137567jsn8128d787c67e',
            'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
    };
    
    fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${value}`, options)
        .then(response => response.json())
        .then(data => {
            
            for (let i = 0; i < 9; i++) {

                const recipeLabel = data.hits[i].recipe.label
                const recipeImg = data.hits[i].recipe.image

                const recipeElement = document.getElementById("search__recipe-container");
                
                recipeElement.innerHTML += `
                <div class="search__recipe-card">
                    <img src="${recipeImg}" class="search__recipe-card--img" />
                    <h3 class="search__recipe-card--label">${recipeLabel}</h3>
                </div>
                `
            }
            
        })
});