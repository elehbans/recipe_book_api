# Recipe Book API

## Development

When developing locally the app can be run directly using flask:

```bash
python -m venv venv
source venv/bin/activate
pip install -r api/requirements.txt
cd api
source .env
flask run
```

## Deployment

After cloning the repo and installing Docker Compose, you can deploy the flask API locally in a container:

```bash
docker-compose build
docker-compose up
```

By default the app uses port `5000` and runs using `gunicorn` instead of the development server from `flask`.

For a cloud deployment, one can use `Pulumi` (an IaC tool) and deploy similarly to this [example](https://github.com/pulumi/examples/blob/master/aws-py-fargate/__main__.py)

## Testing

No unit tests because there is no business logic within the API layer since it functions only as CRUD layer.

```bash
   source venv/bin/activate
   source api/.env
   python3 -m pytest
```

## CI / CD

Integration tests are run each time a commit is pushed using a Github Action

## Hygiene

`black` is used for formatting and `flake8` for linting.

## Design Discussion
- Config management using object allows for easy deployment in different environments
- Using `flask_restful` to manage the boilerplate of API dev
- Using `flask_sqlalchemy` to handle DB connection and table creation in testing / dev environments with sqlite in-memory DB
- Using `flask_marshmallow` to handle response serialization
- DB Operations are utility functions to enable easier testing
- `gunicorn` is used for production-quality service
- Primary Key for the Recipe table is a UUID to support distributed workloads and systems

### Manual QA

```bash

# Add a recipe
curl -X POST http://localhost:5000/recipes \
   -H 'Content-Type: application/json' \
   -d '{"name": "chocolate chip cookies", "description": "delicious", "ingredients": [["flour", "1/2", "C"],["butter", "3", "Tbs"],["chocolate", "4", "Lbs"]], "instructions": "Combine ingredients. Bake at 500 for 2 minutes. Feast"}'

# Retrieve all recipes
curl -X GET http://localhost:5000/recipes

```

# Recipe Book Frontend

## 
