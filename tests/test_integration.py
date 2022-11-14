import json
from flask.testing import FlaskClient
from typing import Dict, List

from api.db.operations import create_recipe, find_one_recipe


def test_create_recipe(client: FlaskClient, data: Dict, headers: Dict):
    rv = client.post(f"/recipes", data=json.dumps(data), headers=headers)
    resp = json.loads(rv.data)

    assert isinstance(resp["data"], Dict)
    assert resp["status"] == 200
    assert resp["message"] is not None


def test_update_recipe(client: FlaskClient, data: Dict, headers: Dict):
    id = create_recipe(**data)[0]["id"]
    data["id"] = id
    data["description"] = "even more delicious"
    rv = client.put(f"/recipes/{id}", data=json.dumps(data), headers=headers)
    resp = json.loads(rv.data)
    after = find_one_recipe(id)[0]

    assert after["description"] == data["description"]
    assert resp["status"] == 200
    assert resp["message"] is not None


def test_find_recipe(client: FlaskClient, data: Dict, headers: Dict):
    id = create_recipe(**data)[0]["id"]
    rv = client.get(f"/recipes/{id}", headers=headers)
    resp = json.loads(rv.data)

    assert isinstance(resp["data"], Dict)
    assert resp["status"] == 200
    assert resp["message"] is not None


def test_find_all_recipes(client: FlaskClient, headers: Dict):
    rv = client.get(f"/recipes", headers=headers)
    resp = json.loads(rv.data)

    assert isinstance(resp["data"], List)
    assert resp["status"] == 200
    assert resp["message"] is not None


def test_delete_recipe(client: FlaskClient, data: Dict, headers: Dict):
    id = create_recipe(**data)[0]["id"]
    rv = client.delete(f"/recipes/{id}", headers=headers)
    resp = json.loads(rv.data)

    assert resp["data"] is None
    assert resp["status"] == 200
    assert resp["message"] is not None
