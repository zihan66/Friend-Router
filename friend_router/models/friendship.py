from . import db

from datetime import datetime


# https://stackoverflow.com/questions/37972778/sqlalchemy-symmetric-many-to-one-friendship
class Friendship(db.Model):
    """Represents friend relationship between users."""

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                        primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                          primary_key=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)

    def __init__(self, friend):
        self.friend = friend
