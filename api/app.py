import os

from api import create_app
from api.db import db

app = create_app()

if os.getenv("CREATE_DB_TABLES") == "True":
    with app.app_context():
        db.create_all()

if __name__ == "__main__":
    app.run()
