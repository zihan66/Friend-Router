from flask import Flask
from os.path import join


def create_app():
    app = Flask(__name__)

    # Load configuration from app.cfg to override default
    app.config.from_object('friend_router.config.Config')
    app.config.from_pyfile('app.cfg', silent=True)

    # Use database in instance path
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI',
        'sqlite:///' + join(app.instance_path, 'app.db'))

    # Initialize JWT (token) authentication
    from friend_router.auth import jwt
    jwt.init_app(app)

    # Initialize SQLAlchemy (database)
    from friend_router.models import db, migrate
    db.init_app(app)
    migrate.init_app(app, db)

    # Initialize Flask-RESTFul
    from friend_router.resources import api
    app.register_blueprint(api, url_prefix='/api')

    # These database commands are for testing purpose
    @app.cli.command('initdb')
    def initdb():
        db.create_all()

    @app.cli.command('dropdb')
    def dropdb():
        db.drop_all()

    return app
