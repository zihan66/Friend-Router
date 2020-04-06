from . import db

from datetime import datetime


class FriendRequest(db.Model):
    """Represents friend request between users.

    The schema is the same as friendship, and is regarded as unconfirmed
    friendship relationship.
    """

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                        primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                          primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)

    def __init__(self, friend):
        self.friend = friend
