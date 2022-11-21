import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import EditViewRecipeForm from './edit_view_recipe_form'
import initialValues from './formik/initial_values'
import { Recipe } from '../../types/custom'

test('initial empty state', () => {
    const mockUpdateRecipesCallback = async () => {}
    const {getByText} = render(<EditViewRecipeForm 
                                selectedRecipe={{} as Recipe} 
                                updateRecipesCallback={mockUpdateRecipesCallback} 
                            />)

    const expectedFields = Object.keys(initialValues)
    expectedFields.forEach((fieldName) => {
        const fieldDescriptor = getByText(fieldName, { exact: false })
        expect(fieldDescriptor).toBeInTheDocument()

        const fieldInput = fieldDescriptor.nextSibling as HTMLInputElement
        expect(fieldInput).toBeInTheDocument()
        console.log(fieldInput)
        expect(fieldInput.getAttribute('value')).toEqual(initialValues[fieldName])
    })
})

test('initial filled state', () => {
    const mockUpdateRecipesCallback = async () => {}
    const mockRecipe : Recipe = {
        id: '',
        name: 'Choco-Chunk Cookie',
        description: 'The Best Cookie Alive',
        instructions: 'Mix in a big bowl. Eat.',
        ingredients: 'Chocolate, Pudding, Jello'
    }

    const {getByText} = render(<EditViewRecipeForm 
                                selectedRecipe={mockRecipe}
                                updateRecipesCallback={mockUpdateRecipesCallback} 
                            />)

    const expectedFields = Object.keys(initialValues)
    expectedFields.forEach((fieldName) => {
        const fieldDescriptor = getByText(fieldName, { exact: false })
        expect(fieldDescriptor).toBeInTheDocument()

        const fieldInput = fieldDescriptor.nextSibling as HTMLInputElement
        expect(fieldInput).toBeInTheDocument()
        console.log(fieldInput)
        expect(fieldInput.getAttribute('value')).toEqual(mockRecipe[fieldName])
    })
})

// // Add Recipe makes correct call to API and triggers updateRecipesCallback
// test('initialized with a selected recipe', () => {
//     const {getByText} = render(<EditViewRecipeForm 
//                                 selectedRecipe={{} as Recipe} 
//                                 updateRecipesCallback={async () => void} 
//                             />)
  
//     expect(getByText(HEADER_MESSAGE)).toBeInTheDocument()
// })

// // Update Recipe makes correct call to API and triggers updateRecipesCallback
// test('initialized with a selected recipe', () => {
//     const {getByText} = render(<EditViewRecipeForm 
//                                 selectedRecipe={{} as Recipe} 
//                                 updateRecipesCallback={async () => void} 
//                             />)
  
//     expect(getByText(HEADER_MESSAGE)).toBeInTheDocument()
// })