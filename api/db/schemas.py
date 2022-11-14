from api.db import ma
from api.db.models import Recipe


class RecipeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Recipe
        load_instance = True


recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True)
