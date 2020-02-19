from flask import Flask
import os

def create_app():
    app = Flask(__name__)

    app.config.from_object('friend_router.config.Config')
    app.config.from_pyfile('app.cfg', silent=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'app.db')

    from friend_router.auth import jwt
    jwt.init_app(app)

    from friend_router.models import db, migrate
    db.init_app(app)
    migrate.init_app(app, db)

    from friend_router.resources import api
    app.register_blueprint(api, url_prefix='/api')

    return app
