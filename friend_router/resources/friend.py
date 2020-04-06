from flask_restful import reqparse
from flask_jwt_extended import current_user
from friend_router.models import db, User, Friendship
from friend_router.marshmallow import UserSchema

from .auth import AuthResource


parser = reqparse.RequestParser()
parser.add_argument('username', required=True)


class FriendResource(AuthResource):
    def get(self):
        schema = UserSchema(many=True)
        return schema.dump(current_user.friends)

    def post(self):
        args = parser.parse_args()
        target = User.get(args['username'])
        if target is None:
            return {'msg': 'Username does not exist.'}, 404
        if target == current_user:
            return {'msg': 'You cannot friend yourself.'}, 400

        current_user.friend_requests_with.append(target)
        db.session.commit()

        return {'msg': 'ok'}
