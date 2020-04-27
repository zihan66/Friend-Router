from . import db

from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy


class User(db.Model):
    """Represents on registered user."""
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Display name shown to other users
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128))

    # Username is unique and case insensitive. However, for display purpose,
    # the original input by user is preserved, as well as the lowercase version.
    username_full = db.Column(db.String(64), nullable=False)
    username_key = db.Column(db.String(64), unique=True, nullable=False)

    email = db.Column(db.String(64), unique=True)

    status = db.Column(db.String(64), default='Free')

    password_hash = db.Column(db.String(80))

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)

    # Refer to all of the location updates from the user, in descending order
    locations = db.relationship(
        'Location', backref='user', order_by='desc(Location.created_at)')

    friendship_forward = db.relationship(
        'Friendship', foreign_keys='Friendship.user_id', backref='user')

    friendship_backward = db.relationship(
        'Friendship', foreign_keys='Friendship.friend_id', backref='friend')

    friend_requests_forward = db.relationship(
        'FriendRequest', foreign_keys='FriendRequest.user_id', backref='user')

    friend_requests_backward = db.relationship(
        'FriendRequest', foreign_keys='FriendRequest.friend_id',
        backref='friend')

    friends_with = association_proxy('friendship_forward', 'friend')
    friends_back = association_proxy('friendship_backward', 'user')

    friend_requests_with = association_proxy(
        'friend_requests_forward', 'friend')
    friend_requests_back = association_proxy(
        'friend_requests_backward', 'user')

    activities_owned = db.relationship(
        'Activity', foreign_keys='Activity.owner_id', backref='owner')
    activity_participants = db.relationship(
        'ActivityParticipant', foreign_keys='ActivityParticipant.user_id',
        backref='user')
    activities_participated = association_proxy(
        'activity_participants', 'activity')

    expo_push_tokens = db.relationship('ExpoPushToken', backref='user')

    def __init__(self, username, password=None,
                 first_name=None, last_name=None):
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
        self.username_key = value.lower()

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
        """Convert the password into hash and store in database."""
        if value is None:
            return

        self.password_hash = generate_password_hash(value)

    @property
    def location(self):
        """Return the latest location of the user. Null if no updates."""
        try:
            return self.locations[0]
        except IndexError:
            return None

    @property
    def seconds_since_active(self):
        """Return the number of seconds since the last location update."""
        if self.location is None:
            return 2147483647
        timediff = datetime.utcnow() - self.location.created_at
        return timediff.total_seconds()

    @property
    def is_active(self):
        """Return the online status of the user."""
        return self.seconds_since_active <= 30

    @property
    def friends(self):
        """Return confirmed friends of the user."""
        return self.friends_with + self.friends_back

    @property
    def friend_requests(self):
        """Return all friend requests."""
        return self.friend_requests_with + self.friend_requests_back

    @property
    def activities(self):
        """Return all activities, owned or participated."""
        return self.activities_owned + self.activities_participated

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
