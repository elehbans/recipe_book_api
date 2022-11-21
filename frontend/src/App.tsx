import React, { useCallback, useEffect, useState } from 'react';

// Components
import EditViewRecipeForm from './components/edit_view_recipe_form/edit_view_recipe_form';
import Header from './components/header';
import RecipeTable from './components/recipe_table/recipe_table';

// Functions
import API from './utils/api'

// Types
import { Recipe } from './types/custom';

// Styling
import './App.css';

function App() {

  // State
  const [recipes, setRecipes] = useState(new Array<Recipe>())
  const [selectedRecipe, setSelectedRecipe] = useState({} as Recipe)

  // memoized callbacks for state updates from child components
  const updateRecipesCallback = useCallback(async () => {
    const updatedRecipes = await API.get_all_recipes() as Recipe[]
    setRecipes(updatedRecipes)
  }, [setRecipes])

  const updateSelectedRecipeCallback = useCallback((id: string) => {
    const newSelectedRecipe = recipes.find((value) => value.id === id) as Recipe
    setSelectedRecipe(newSelectedRecipe)
  }, [setSelectedRecipe, recipes])

  // onLoad
  useEffect(() => {
    updateRecipesCallback()
  }, [updateRecipesCallback])

  return (
    <div className="app-container">
        <Header/>
        <RecipeTable 
          updateRecipesCallback={updateRecipesCallback}
          updateSelectedRecipeCallback={updateSelectedRecipeCallback} 
          recipes={recipes}
        />
        <EditViewRecipeForm 
          updateRecipesCallback={updateRecipesCallback} 
          selectedRecipe={selectedRecipe}
        />
    </div>
  );
}

export default App;
