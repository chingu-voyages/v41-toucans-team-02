import "./search.scss";
import "../style.css"

let allRecipes = [];
let oneRecipe;

const searchInput = document.getElementById("searchBar");
const viewOneRecipe = document.querySelector('.recipe');
const mainRecipes = document.getElementById('mainRecipes');
let recipeElement = document.getElementById('search__recipe-container')

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
          recipeElement.innerHTML = ''
            for (let i = 0; i < data.hits.length; i++) {
              const recipeLabel = data.hits[i].recipe.label
              const recipeImg = data.hits[i].recipe.image

              let recipes = data.hits[i].recipe;
              allRecipes.push(recipes);

              searchInput.value = '';

              recipeElement.innerHTML += `
                <div class="search__recipe-card">
                    <div class="img-holder">
                        <img src="${recipeImg}" class="search__recipe-card--img" />
                    </div>
                    <div class="data-holder">
                        <h3 class="search__recipe-card--label">${recipeLabel}</h3>
                    </div>
                </div>
                `
            }
            oneRecipe = document.querySelectorAll('.data-holder > h3')

            oneRecipe.forEach((recipe) => {
              recipe.addEventListener('click', showRecipe)
            })
        })
});

function showRecipe() {
    mainRecipes.style.display = 'none';
    viewOneRecipe.style.display = 'block'
    let recipeName = this.innerText;
    let image;
    let recipeLabel;
    let calories;
    let cuisine;
    let mealType;
    let weight;
    let ingredient = [];
    let ingredients = [];

    for (let index = 0; index < allRecipes.length; index++) {
        let oneRecipe = allRecipes[index];
        recipeLabel = allRecipes[index].label
      if (recipeName === recipeLabel) {
        image = oneRecipe.image
        calories = Math.floor(oneRecipe.calories);
        cuisine = oneRecipe.cuisineType[0];
        mealType = oneRecipe.mealType[0];
        weight = Math.floor(oneRecipe.totalWeight)
        let ingredientsArr = oneRecipe.ingredientLines;
        ingredientsArr.forEach(ingredientArr => ingredient.push(ingredientArr));

        let ingredientsArr2 = oneRecipe.ingredients;
        ingredientsArr2.forEach(ingredientArr2 => ingredients.push(ingredientArr2))
      }
    }

    viewOneRecipe.innerHTML = `
    <div class="view-one-recipe-container">
      <button class="view-recipe-btn">&laquo; Back</button>
      <div class="one-recipe-img-holder"><img src="${image}" alt="${recipeLabel}"></div>
      <h2>${recipeLabel}</h2>
      <h4>Calories : ${calories}</h4>
      <h4>Cuisine : ${cuisine}</h4>
      <h4>${mealType}</h4>
      <h4>${weight} gr</h4>
      <p>Ingredient :</p>
      <ul id="my-ingredient"></ul>
    </div>
    `

    for (let i = 0; i < ingredients.length; i++) {
      const oneIngredient = ingredients[i];

      let myIngredient = document.getElementById('my-ingredient')
      let li = document.createElement('li');
      li.innerHTML = `<img src="${oneIngredient.image}" alt="${oneIngredient.foodCategory}">${oneIngredient.foodCategory} : ${oneIngredient.text} (${Math.floor(oneIngredient.weight)} gr)`;
      myIngredient.appendChild(li);
    }
    
    const viewRecipeBtn = document.querySelector('.view-recipe-btn');
    viewRecipeBtn.addEventListener('click', backToRecipes);

    function backToRecipes() {
      viewOneRecipe.style.display = 'none'
      mainRecipes.style.display = 'block';
    }
}