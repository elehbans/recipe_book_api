import { Recipe } from '../types/custom'

const apiUrlBase = '/recipes'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const makeRecipeByIdUrl = (recipe: Recipe) => {
  return apiUrlBase + '/' + recipe.id
}

const get_all_recipes = async () => {
  const results = await fetch(apiUrlBase)
    .then(async response => await response.json())
  const recipeList = results.data as Recipe[]
  return recipeList
}

const add_recipe = async (recipe: Recipe) => {
  const requestBody = Object.fromEntries(Object.entries(recipe).filter(([key, val]) => key !== 'id'))
  const results = await fetch(apiUrlBase, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody)
  })
    .then(async response => await response.json())
  return results
}

const update_recipe = async (recipe: Recipe) => {
  const results = await fetch(makeRecipeByIdUrl(recipe), {
    method: 'PUT',
    headers,
    body: JSON.stringify(recipe)
  })
    .then(async response => await response.json())
  return results
}

const delete_recipe = async (recipe: Recipe) => {
  const results = await fetch(makeRecipeByIdUrl(recipe), {
    method: 'DELETE',
    headers,
    body: JSON.stringify(recipe)
  })
    .then(async response => await response.json())
  return results
}

const API = {
  get_all_recipes,
  add_recipe,
  update_recipe,
  delete_recipe
}

export default API
