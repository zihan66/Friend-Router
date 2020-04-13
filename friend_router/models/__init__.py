from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

from .user import User  # noqa
from .location import Location  # noqa
from .friendship import Friendship  # noqa
from .friendrequest import FriendRequest  # noqa
from .activity import Activity  # noqa
from .activityparticipant import ActivityParticipant  # noqa
