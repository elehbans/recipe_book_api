import React from 'react';
import * as Yup from 'yup';

const MESSAGES = {
    too_long: 'Too Long!',
    too_short: 'Too Short!',
    required: 'Field is Required',
    ingredients_incorrectly_formatted: 'expected format for each ingredient: "<quantity>,<quantityType>,<name>;"'
}

const recipeFormSchema = Yup.object().shape({
  id: Yup.string()
    .matches(/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/), // str(uuid4())
  name: Yup.string()
    .min(5, MESSAGES.too_short)
    .max(50, MESSAGES.too_long)
    .required(MESSAGES.required),
  description: Yup.string()
    .min(10, MESSAGES.too_short)
    .max(50, MESSAGES.too_long)
    .required(MESSAGES.required),
  ingredients: Yup.string()
    // .matches(/[a-z]{1,},[a-z]{1,},[a-z]{1,};(?:[a-z]{1,},[a-z]{1,},[a-z]{1,};)/, MESSAGES.ingredients_incorrectly_formatted)
    .required(MESSAGES.required),
  instructions: Yup.string()
    .min(10, MESSAGES.too_short)
    .max(200, MESSAGES.too_long)
    .required(MESSAGES.required),
});

export default recipeFormSchema