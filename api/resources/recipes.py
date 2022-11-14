from flask import jsonify, request
from flask_restful import Resource

from api.db.operations import format_response, find_all_recipes, create_recipe


class Recipes(Resource):
    def get(self):
        data = find_all_recipes()
        return jsonify(format_response(data, 200))

    def post(self):
        data = create_recipe(**request.json)
        return jsonify(format_response(data, 200))
