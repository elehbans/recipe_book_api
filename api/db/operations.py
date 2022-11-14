from typing import Tuple, Union

from api.db.models import Recipe
from api.db.schemas import recipe_schema, recipes_schema
from api.db import db


def format_response(data: Tuple[Union[str, None], str], code: int):
    response = {"message": data[1], "status": code, "data": data[0]}

    return response


def create_recipe(
    name: str, ingredients: str, description: str, instructions: str
) -> Tuple[str, str]:
    new_recipe = Recipe(
        name=name,
        ingredients=ingredients,
        description=description,
        instructions=instructions,
    )
    db.session.add(new_recipe)
    db.session.commit()
    result = recipe_schema.dump(new_recipe)
    message = "New Recipe Created"

    return (result, message)


def update_recipe(
    id: str, name: str, ingredients: str, description: str, instructions: str
) -> Tuple[str, str]:
    recipe = Recipe.query.get(id)

    if recipe:
        recipe.name = name
        recipe.ingredients = ingredients
        recipe.description = description
        recipe.instructions = instructions

        db.session.commit()
        result = recipe_schema.dump(recipe)
        message = "Recipe info updated"
    else:
        result = None
        message = "Invalid Recipe Id"

    return (result, message)


def delete_recipe(id: str) -> Tuple[str, str]:
    recipe = Recipe.query.get(id)

    if recipe:
        db.session.delete(recipe)
        db.session.commit()
        message = "Recipe Deleted"
    else:
        message = "Invalid Recipe Id"

    return (None, message)


def find_one_recipe(id: str) -> Tuple[str, str]:
    recipe = Recipe.query.get(id)

    if recipe:
        result = recipe_schema.dump(recipe)
        message = "Recipe Found"
    else:
        result = None
        message = "Recipe Not Found"

    return (result, message)


def find_all_recipes() -> Tuple[str, str]:
    all_recipes = Recipe.query.all()
    result = recipes_schema.dump(all_recipes)
    message = "All Recipes"
    return (result, message)
