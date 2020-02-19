from flask import Flask

def create_app():
    app = Flask(__name__)

    app.config.from_object('friend_router.config.Config')
    app.config.from_pyfile('app.cfg', silent=True)

    from friend_router.models import db, migrate
    db.init_app(app)
    migrate.init_app(app, db)

    from friend_router.resources import api
    api.init_app(app)

    return app
