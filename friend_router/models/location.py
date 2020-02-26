from . import db

from datetime import datetime


# https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    latitude = db.Column(db.Float, default=0, nullable=False)
    longitude = db.Column(db.Float, default=0, nullable=False)
    accuracy = db.Column(db.Float, default=0)

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
