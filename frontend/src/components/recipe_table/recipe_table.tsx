import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'

import TableWrapper from './children/table_wrapper'
import { Recipe } from '../../types/custom'

interface RecipeTableProps {
  updateRecipesCallback: () => Promise<void>
  updateSelectedRecipeCallback: (id: string) => void
  recipes: Recipe[]
}

function RecipeTable ({ updateRecipesCallback, updateSelectedRecipeCallback, recipes }: RecipeTableProps) {
  return (
        <Card className='recipe-table-container'>
            <Card.Header>Current Recipes</Card.Header>
            { recipes.length > 0
              ? TableWrapper({ updateRecipesCallback, updateSelectedRecipeCallback, recipes })
              : 'No Recipes Yet - Add one using form below'
            }
        </Card>
  )
}

export default RecipeTable
