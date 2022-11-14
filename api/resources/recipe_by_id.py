from flask import request, jsonify
from flask_restful import Resource

from api.db.operations import (
    format_response,
    find_one_recipe,
    delete_recipe,
    update_recipe,
)


class RecipeById(Resource):
    def get(self, id: str):
        result = find_one_recipe(id)
        return jsonify(format_response(result, 200))

    def put(self, id: str):
        if request.json["id"] != id:
            message = "Id in request JSON does not match Id in Route"
            return jsonify(format_response((None, message), 400))
        else:
            result = update_recipe(**request.json)
            return jsonify(format_response(result, 200))

    def delete(self, id: str):
        result = delete_recipe(id)
        return jsonify(format_response(result, 200))
