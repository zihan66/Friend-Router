from flask_restful import reqparse
from flask_jwt_extended import current_user
from friend_router.models import db, Location
from friend_router.marshmallow import LocationSchema

from .auth import AuthResource


parser = reqparse.RequestParser()
parser.add_argument('latitude', type=float, required=True)
parser.add_argument('longitude', type=float, required=True)
parser.add_argument('accuracy', type=float, required=True)


class LocationResource(AuthResource):
    def get(self):
        schema = LocationSchema(many=True)
        return schema.dump(current_user.locations)

    def post(self):
        args = parser.parse_args()
        location = Location(latitude=args['latitude'],
                            longitude=args['longitude'],
                            accuracy=args['accuracy'])
        current_user.locations.append(location)

        db.session.commit()
        schema = LocationSchema()
        return schema.dump(location)
