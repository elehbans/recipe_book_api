import os

BASEDIR = os.path.abspath(os.path.dirname(__file__))


class BaseConfig(object):
    DEBUG = False


class DevelopmentConfig(BaseConfig):
    DATABASE_NAME = "dev.db"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASEDIR, DATABASE_NAME)
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(BaseConfig):
    DATABASE_NAME = "test.db"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASEDIR, DATABASE_NAME)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
