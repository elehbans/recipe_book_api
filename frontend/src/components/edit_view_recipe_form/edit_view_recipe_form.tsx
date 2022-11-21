import React from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Card } from 'react-bootstrap'

import initialValues from './formik/initial_values'
import recipeFormSchema from './formik/validation_schema'
import API from '../../utils/api'
import { Recipe } from '../../types/custom'

interface FieldFactoryProps {
  fieldName: string,
}

function FieldFactory (props: FieldFactoryProps) {

  const prettyDescription = `${props.fieldName}: `
  const fieldId = `edit-view-form-${props.fieldName}-field`

  return(
    <div key={`${props.fieldName}-container`}>
        <label key={`${props.fieldName}-label`} htmlFor='id'>{prettyDescription}</label>
        <Field key={`${props.fieldName}-field`} type="text" name={props.fieldName} id={fieldId} readOnly={props.fieldName === 'id'} />
        <ErrorMessage key={`${props.fieldName}-error-msg`} name={props.fieldName} className='formik-error' component='div'/>
    </div>
  )
}

interface EditViewRecipeFormProps {
  updateRecipesCallback: () => Promise<void>
  selectedRecipe: Recipe
}

function EditViewRecipeForm ({ updateRecipesCallback, selectedRecipe }: EditViewRecipeFormProps) {
  const initValues: Recipe =
        selectedRecipe === undefined || Object.keys(selectedRecipe).length === 0
          ? initialValues
          : selectedRecipe

  return (
        <Card className='edit-view-recipe-container'>
            <Card.Header>Recipe Entry Form</Card.Header>
            <Formik
                enableReinitialize // necessary for re-render when initValues update.
                initialValues={initValues}
                validationSchema={recipeFormSchema}
                onSubmit={(values: Recipe, { setSubmitting, setErrors, setValues, setTouched }) => {
                  setTimeout(async () => {
                    if (Object.keys(selectedRecipe).length === 0) {
                      await API.add_recipe(values)
                    } else {
                      await API.update_recipe(values)
                    }
                    updateRecipesCallback()

                    // resetForm returns to initial state, does not clear
                    setTouched({})
                    setErrors({})
                    setValues(initialValues)
                    setSubmitting(false)
                  }, 400)
                }}
            >
                {({ isSubmitting, isValid }) => (
                    <Form>
                        {Array.from(Object.keys(initialValues), (fieldName) => <FieldFactory fieldName={fieldName} />)}

                        <button type="submit" disabled={isSubmitting || !isValid}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </Card>
  )
}

export default EditViewRecipeForm
