from . import db

from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer,
    BadSignature, SignatureExpired)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(128))
    last_name = db.Column(db.String(128))
    username = db.Column(db.String(128), unique=True)

    def __init__(self, username):
        self.username = username

    @staticmethod
    def get(username):
        username = username.lower()

        return User.query.filter_by(username=username).first()


    @staticmethod
    def verify_user(username, password=None):
        u = User.get(username)
        if u is None:
            u = User(username)
        db.session.add(u)
        db.session.commit()
        return u
