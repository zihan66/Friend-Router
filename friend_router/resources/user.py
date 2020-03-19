from flask_restful import abort
from flask_jwt_extended import current_user

from friend_router.models import User
from friend_router.marshmallow import UserSchema

from .auth import AuthResource


class UserResource(AuthResource):
    def get(self, id=None):
        if id is None:
            # If no argument, return the current user
            user = current_user
        else:
            # Otherwise, return the user with given id.
            user = User.query.get(id)

        if user is None:
            abort(404, message='User does not exist.')

        schema = UserSchema()
        return schema.dump(user)
