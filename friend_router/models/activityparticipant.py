from . import db


class ActivityParticipant(db.Model):
    """Represents friend relationship between users."""

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
                        primary_key=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'),
                            primary_key=True)

    def __init__(self, user):
        self.user = user
