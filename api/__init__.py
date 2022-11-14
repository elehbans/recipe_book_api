from flask import Flask
from flask_restful import Api
import os

from api.db import db, ma


# App factory enables easier testing
def create_app():
    app = Flask(__name__)
    app.config.from_object(os.environ["CONFIG_TYPE"])

    db.init_app(app)
    ma.init_app(app)

    with app.app_context():
        from api.resources.recipe_by_id import RecipeById
        from api.resources.recipes import Recipes

        # Note on error handling:
        # flask_restful takes care of all 400 and 500 errors including
        # 405: request method not allowed
        # 404: resource not found
        api = Api(app, catch_all_404s=True)

        api.add_resource(Recipes, "/recipes")
        api.add_resource(RecipeById, "/recipes/<string:id>")

    return app
