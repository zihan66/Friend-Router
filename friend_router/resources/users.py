from friend_router.models import User

from friend_router.marshmallow import UserSchema
from .auth import AuthResource


class Users(AuthResource):
    def get(self):
        schema = UserSchema(many=True)
        return {'users': schema.dump(User.query.all())}
