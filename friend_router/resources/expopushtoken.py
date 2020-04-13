from datetime import datetime

from flask_restful import reqparse, abort
from flask_jwt_extended import current_user
from exponent_server_sdk import PushClient

from friend_router.models import db, ExpoPushToken
from friend_router.marshmallow import ExpoPushTokenSchema

from .auth import AuthResource

parser = reqparse.RequestParser()
parser.add_argument('token', required=True)


class ExpoPushTokenResource(AuthResource):
    def get(self):
        schema = ExpoPushTokenSchema(many=True)
        return schema.dump(current_user.expo_push_tokens)

    def post(self):
        """Register expo push token."""
        args = parser.parse_args()
        token = args.get('token')
        if not PushClient.is_exponent_push_token(token):
            abort(400, message='Invalid push token')
        pushtoken = ExpoPushToken.query.filter_by(token=token).first()

        # Update token if token is already registered
        if pushtoken is not None:
            pushtoken.user = current_user
            pushtoken.created_at = datetime.utcnow()
            db.session.commit()
            return {'msg': 'updated'}

        pushtoken = ExpoPushToken(token=token)
        current_user.expo_push_tokens.append(pushtoken)
        db.session.commit()
        return {'msg': 'created'}
