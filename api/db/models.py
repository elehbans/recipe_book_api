from sqlalchemy import JSON
from uuid import uuid4

from api.db import db


class Recipe(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(100))
    ingredients = db.Column(JSON)
    description = db.Column(db.String(200))
    instructions = db.Column(db.String(500))

    def __init__(
        self, name: str, ingredients: str, description: str, instructions: str
    ) -> None:
        self.id = str(uuid4())
        self.name = name
        self.ingredients = ingredients
        self.description = description
        self.instructions = instructions
