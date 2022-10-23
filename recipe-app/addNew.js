const addNewBtn = document.querySelector('.add-new');
const mainRecipes = document.getElementById('mainRecipes')
const newRecipeContainer = document.querySelector('.new-recipe-container');
const errorBox = document.getElementById('error-box')

let newRecipe = {
    "name": '',
    "calories": '',
    "cuisine": '',
    "type": '',
    "weight": '',
    "ingredient": ''
};

addNewBtn.addEventListener('click', addNewRecipe)

function addNewRecipe() {
  mainRecipes.style.display = 'none'
  addNewBtn.style.display = 'none'
  newRecipeContainer.style.display = 'block'
  backBtn()

  // Back button
  const myBackBtn = document.getElementById('backBtn')
  myBackBtn.addEventListener('click', () => {
    newRecipeContainer.style.display = 'none'
    errorBox.style.display = 'none'
    mainRecipes.style.display = 'block'
    addNewBtn.style.display = 'block'
    newRecipeContainer.innerHTML = ''
  })

  // Form
  const form = document.createElement('form')
  form.id = 'addNewRecipeForm'

  // Recipe name
  const recipeNameInput = document.createElement('input')
  recipeNameInput.setAttribute('type', 'text')
  recipeNameInput.setAttribute('placeholder', 'recipe name')
  recipeNameInput.id = 'recipeName'

  // Calories
  const caloriesInput = document.createElement('input')
  caloriesInput.setAttribute('type', 'text')
  caloriesInput.setAttribute('placeholder', 'calories')
  caloriesInput.id = 'recipeCalories'

  // Cuisine
  const cuisineInput = document.createElement('input')
  cuisineInput.setAttribute('type', 'text')
  cuisineInput.setAttribute('placeholder', 'cuisine')
  cuisineInput.id = 'recipeCuisine'

  // Type
  const typeInput = document.createElement('input')
  typeInput.setAttribute('type', 'text')
  typeInput.setAttribute('placeholder', 'breakfast-lunch-dinner')
  typeInput.id = 'recipeType'

  // Weight
  const weightInput = document.createElement('input')
  weightInput.setAttribute('type', 'text')
  weightInput.setAttribute('placeholder', 'weight in grams')
  weightInput.id = 'recipeWeight'

  // Ingredient textarea
  const ingredientTextArea = document.createElement('textarea')
  ingredientTextArea.setAttribute('placeholder', 'Ingredient')
  ingredientTextArea.id = 'recipeIngredient'

  // Submit
  const submitInput = document.createElement('input')
  submitInput.setAttribute('type', 'submit')
  submitInput.setAttribute('value', 'Save')
  submitInput.id = 'recipeSubmit'

  newRecipeContainer.appendChild(form)
  form.appendChild(recipeNameInput)
  form.appendChild(caloriesInput)
  form.appendChild(cuisineInput)
  form.appendChild(typeInput)
  form.appendChild(weightInput)
  form.appendChild(ingredientTextArea)
  form.appendChild(submitInput)

  const myForm = document.getElementById('addNewRecipeForm')
  const allInputs = document.querySelectorAll('input[type=text]')
  const recipeName = document.getElementById('recipeName')
  const recipeCalories = document.getElementById('recipeCalories')
  const recipeCuisine = document.getElementById('recipeCuisine')
  const recipeType = document.getElementById('recipeType')
  const recipeWeight = document.getElementById('recipeWeight')
  const recipeIngredient = document.getElementById('recipeIngredient')
  const recipeSubmitBtn = document.getElementById('recipeSubmit')

  recipeSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let recipeNameValue = recipeName.value
    let recipeCaloriesValue = recipeCalories.value
    let recipeCuisineValue = recipeCuisine.value
    let recipeTypeValue = recipeType.value
    let recipeWeightValue = recipeWeight.value
    let recipeIngredientValue = recipeIngredient.value

    if (
      recipeNameValue !== '' &&
      recipeCaloriesValue !== '' &&
      recipeCuisineValue !== '' &&
      recipeTypeValue !== '' &&
      recipeWeightValue !== '' &&
      recipeIngredientValue !== ''
    ) {
      errorBox.style.display = 'none'

      newRecipe.name = recipeNameValue
      newRecipe.calories = recipeCaloriesValue
      newRecipe.cuisine = recipeCuisineValue
      newRecipe.type = recipeTypeValue
      newRecipe.weight = recipeWeightValue
      newRecipe.ingredient = recipeIngredientValue

      addNewRecipeToLocalStorage()

      allInputs.forEach((oneInput) => (oneInput.value = ''))
      recipeIngredient.value = ''
    } else {
      errorBox.style.display = 'block'
    }
  })
}

function backBtn() {
    const backBtn = document.createElement('button')
    backBtn.id = 'backBtn';
    backBtn.innerHTML = '&laquo; Back'

    return newRecipeContainer.appendChild(backBtn)
}

function addNewRecipeToLocalStorage() {
    localStorage.newRecipe = JSON.stringify(newRecipe);
}