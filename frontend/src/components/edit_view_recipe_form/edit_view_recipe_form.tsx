import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card } from 'react-bootstrap';

import initialValues from './formik/initial_values';
import recipeFormSchema from './formik/validation_schema';
import API from '../../utils/api';
import { Recipe } from '../../types/custom';


interface EditViewRecipeFormProps {
    updateRecipesCallback: () => Promise<void>,
    selectedRecipe: Recipe
}

function EditViewRecipeForm({updateRecipesCallback, selectedRecipe}: EditViewRecipeFormProps){

    const initValues : Recipe = 
        selectedRecipe === undefined || Object.keys(selectedRecipe).length === 0
        ? initialValues
        : selectedRecipe

    return(
        <Card className='edit-view-recipe-container'>
            <Card.Header>Recipes</Card.Header>
            <Formik
                enableReinitialize // necessary for re-render when initValues update.
                initialValues={initValues}
                validationSchema={recipeFormSchema}
                onSubmit={(values: Recipe, { setSubmitting, setErrors, setValues, setTouched }) => {
                    setTimeout(async () => {
                        if (Object.keys(selectedRecipe).length === 0) {
                            await API.add_recipe(values as Recipe)
                        }else{
                            await API.update_recipe(values as Recipe)
                        }
                        updateRecipesCallback()

                        // resetForm returns to initial state, does not clear
                        setTouched({})
                        setErrors({})
                        setValues(initialValues)
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting, isValid }) => (
                    <Form>
                        <div>
                            <label htmlFor='id'>{'Id: '}</label>
                            <Field type="text" name="id" id='edit-view-form-id-field' readOnly/> 
                            <ErrorMessage name='id' className='formik-error' component='div'/>
                        </div>
                        
                        <div>
                            <label htmlFor='name'>{'Name: '}</label>
                            <Field type="text" name="name"/>
                            <ErrorMessage name='name' className='formik-error' component='div'/>
                        </div>
                        
                        <div>
                            <label htmlFor='description'>{'Description: '}</label>
                            <Field type="text" name="description"/>
                            <ErrorMessage name='description' className='formik-error' component='div'/>
                        </div>
                        
                        <div>
                            <label htmlFor='ingredients'>{'Ingredients: '}</label>
                            <Field type="text" name="ingredients"/>
                            <ErrorMessage name='ingredients' className='formik-error' component='div'/>
                        </div>
                        
                        <div>
                            <label htmlFor='instructions'>{'Instructions: '}</label>
                            <Field type="text" name="instructions"/>
                            <ErrorMessage name='instructions' className='formik-error' component='div'/>
                        </div>
                        
                        <button type="submit" disabled={isSubmitting || !isValid}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </Card>
    )
}

export default EditViewRecipeForm;