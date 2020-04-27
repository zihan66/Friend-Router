from flask_restful import reqparse
from flask_jwt_extended import current_user
from friend_router.models import db

from .auth import AuthResource


parser = reqparse.RequestParser()
parser.add_argument('status', type=str, required=True)


class StatusResource(AuthResource):
    def post(self):
        args = parser.parse_args()
        current_user.status = args['status']

        db.session.commit()
        return {'msg': 'ok'}
