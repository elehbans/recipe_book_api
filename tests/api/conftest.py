import os
import pytest

from api.app import create_app
from api.db import db


@pytest.fixture(scope="module")
def client():
    os.environ["CONFIG_TYPE"] = "api.config.TestingConfig"
    app = create_app()
    app.config["TESTING"] = True  # verbose error logging

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.drop_all()


@pytest.fixture(scope="module")
def headers():
    mimetype = "application/json"
    headers = {"Content-Type": mimetype, "Accept": mimetype}
    return headers


@pytest.fixture(scope="function")
def data():
    recipe = {
        "name": "chocolate chip cookies",
        "description": "delicious",
        "ingredients": [
            ["flour", "1/2", "C"],
            ["butter", "3", "Tbs"],
            ["chocolate", "4", "Lbs"],
        ],
        "instructions": "Combine ingredients. Bake at 500 for 2 minutes. Feast",
    }

    return recipe
