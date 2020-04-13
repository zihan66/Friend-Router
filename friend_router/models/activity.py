from . import db

from datetime import datetime
from sqlalchemy.ext.associationproxy import association_proxy


class Activity(db.Model):
    """Represents a invitation for an event."""

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Location of the destination
    latitude = db.Column(db.Float, default=0, nullable=False)
    longitude = db.Column(db.Float, default=0, nullable=False)
    accuracy = db.Column(db.Float, default=0, nullable=False)

    # Name of the destination
    destination = db.Column(db.String(64), default='')

    # Description of the event
    description = db.Column(db.String(512), default='')

    # Time the event is going to happen
    start_time = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    activity_participants = db.relationship(
        'ActivityParticipant',
        foreign_keys='ActivityParticipant.activity_id',
        backref='activity')

    participants = association_proxy(
        'activity_participants', 'user')
