from . import db

from datetime import datetime

from werkzeug.security import generate_password_hash, check_password_hash

from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128))
    username_full = db.Column(db.String(64), nullable=False)
    username_key = db.Column(db.String(64), unique=True, nullable=False)

    email = db.Column(db.String(64), unique=True)
    password_hash = db.Column(db.String(80))

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def __init__(self, username, password=None, first_name=None, last_name=None):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = password


    @hybrid_property
    def username(self):
        return self.username_key

    @username.setter
    def username(self, value):
        self.username_full = value
        self.username_key = value

        if self.first_name is None:
            self.first_name = value.capitalize()

    @username.expression
    def username(cls):
        return cls.username_key

    @hybrid_property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, value):
        if value is None:
            return

        self.password_hash = generate_password_hash(value)

    @staticmethod
    def get(username):
        """Query a user by username."""
        return User.query.filter_by(username=username.lower()).first()

    @staticmethod
    def verify_user(username, password=None):
        """Verify user credentials, and return the user if successful."""
        u = User.get(username)

        # Create user if not exist (temporary for now)
        if u is None:
            u = User(username, password)
            db.session.add(u)
            db.session.commit()
            return u

        if u.password is None or check_password_hash(u.password, password):
            return u


    def __repr__(self):
        return '<User %r>' % self.username
