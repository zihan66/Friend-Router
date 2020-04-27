from flask_jwt_extended import current_user
from friend_router.models import User

from friend_router.marshmallow import UserSchema
from .auth import AuthResource


class Users(AuthResource):
    def get(self):
        schema = UserSchema(many=True)
        users = User.query.filter(User.id != current_user.id)
        return {'users': schema.dump(users.all())}
