from flask_restful import reqparse
from flask_jwt_extended import current_user
from friend_router.models import db, User, Friendship, FriendRequest
from friend_router.marshmallow import UserSchema

from .auth import AuthResource


parser = reqparse.RequestParser()
parser.add_argument('username', required=True)


class FriendRequestResource(AuthResource):
    def get(self):
        schema = UserSchema(many=True)
        return schema.dump(current_user.friend_requests)

    def post(self):
        args = parser.parse_args()
        target = User.get(args['username'])
        if target is None:
            return {'msg': 'Username does not exist.'}, 404

        friendrequest = FriendRequest.query.get((target.id, current_user.id))
        if friendrequest is None:
            return {'msg': 'Friend request does not exist'}, 404

        target.friends_with.append(current_user)
        db.session.delete(friendrequest)

        db.session.commit()

        return {'msg': 'ok'}
