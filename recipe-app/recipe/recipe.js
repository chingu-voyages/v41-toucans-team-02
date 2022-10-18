import { API_ID, API_KEY } from "./config";
import "./recipe.scss";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faFire, faClock, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

library.add(faFire);
library.add(faClock);
library.add(faScaleBalanced);

const recipe = document.querySelector(".recipe");

const hashId = location.hash.substring(1);

export const fetchRecipeById = async function () {
  try {
    const baseURL = `https://api.edamam.com/api/recipes/v2/${hashId}?type=public&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    renderRecipe(data);
    console.log(data);
    console.log(data.recipe.ingredientLines);
  } catch (error) {
    throw error;
  }
};

const renderRecipe = (data) => {
  const recipeWrapper = document.createElement("div");
  recipeWrapper.className = "recipe__wrapper";
  recipe.appendChild(recipeWrapper);

  const recipeImageWrapper = document.createElement("div");
  recipeImageWrapper.className = "recipe__image__wrapper";
  const recipeImage = document.createElement("img");
  recipeImage.src = data.recipe.images.LARGE.url;
  recipeImage.alt = data.recipe.label;
  recipeImageWrapper.appendChild(recipeImage);
  recipeWrapper.appendChild(recipeImageWrapper);

  const recipeDescription = document.createElement("div");
  recipeDescription.className = "recipe__description";
  recipeWrapper.appendChild(recipeDescription);

  const recipeName = document.createElement("h1");
  recipeName.textContent = data.recipe.label;
  recipeDescription.appendChild(recipeName);

  const recipeTags = document.createElement("div");
  recipeTags.className = "recipe__tags";
  recipeDescription.appendChild(recipeTags);

  data.recipe.dietLabels.map((diet) => {
    const dietLabels = document.createElement("div");
    dietLabels.innerHTML = diet;
    recipeTags.appendChild(dietLabels);
  });

  data.recipe.cuisineType.map((type) => {
    const cuisineType = document.createElement("div");
    cuisineType.innerHTML = type;
    recipeTags.appendChild(cuisineType);
  });

  data.recipe.dishType.map((type) => {
    const dishType = document.createElement("div");
    dishType.innerHTML = type;
    recipeTags.appendChild(dishType);
  });

  data.recipe.mealType.map((type) => {
    const mealType = document.createElement("div");
    mealType.innerHTML = type;
    recipeTags.appendChild(mealType);
  });

  const ingredientList = document.createElement("ul");
  recipeDescription.appendChild(ingredientList);

  data.recipe.ingredientLines.map((item) => {
    const ingredient = document.createElement("li");
    ingredient.innerHTML = item;
    ingredientList.appendChild(ingredient);
  });

  const additionalInformation = document.createElement("div");
  additionalInformation.className = "recipe__additionalInformation";
  recipeDescription.appendChild(additionalInformation);

  const calories = document.createElement("div");
  calories.innerHTML = `calories: ${Math.round(data.recipe.calories)}`;
  additionalInformation.appendChild(calories);

  const fireIcon = document.createElement("span");
  fireIcon.innerHTML = icon({ prefix: "fas", iconName: "fire" }).html;
  calories.prepend(fireIcon);

  const totalTime = document.createElement("div");
  totalTime.innerHTML = `Time: ${Math.round(data.recipe.totalTime)}`;
  additionalInformation.appendChild(totalTime);

  const timeIcon = document.createElement("span");
  timeIcon.innerHTML = icon({ prefix: "fas", iconName: "clock" }).html;
  totalTime.prepend(timeIcon);

  const totalWeight = document.createElement("div");
  totalWeight.innerHTML = `Weight: ${Math.round(data.recipe.totalWeight)}`;
  additionalInformation.appendChild(totalWeight);

  const weightIcon = document.createElement("span");
  weightIcon.innerHTML = icon({ prefix: "fas", iconName: "scale-balanced" }).html;
  totalWeight.prepend(weightIcon);

  const recipeInstructions = document.createElement("div");
  recipeInstructions.className = "recipe__instruction";
  recipeDescription.appendChild(recipeInstructions);

  const anchor = document.createElement("a");
  const textNode = document.createTextNode("instruction");
  anchor.appendChild(textNode);
  anchor.title = "this is link";
  anchor.href = data.recipe.url;
  recipeInstructions.appendChild(anchor);
};
