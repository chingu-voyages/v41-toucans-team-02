import { API_ID, API_KEY } from "./config";

const recipe = document.querySelector(".recipe");

const hashId = location.hash.substring(1);

export const fetchRecipeById = async function () {
  try {
    const baseURL = `https://api.edamam.com/api/recipes/v2/${hashId}?type=public&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    renderRecipe(data);
  } catch (error) {
    throw error;
  }
};

const renderRecipe = (data) => {
  const recipeWrapper = document.createElement("div");
  recipe.appendChild(recipeWrapper);

  const recipeImage = document.createElement("img");
  recipeImage.src = data.recipe.image;
  recipeImage.alt = data.recipe.label;
  recipeWrapper.appendChild(recipeImage);

  const recipeName = document.createElement("h2");
  recipeName.innerHTML = data.recipe.label;
  recipeWrapper.appendChild(recipeName);
};
