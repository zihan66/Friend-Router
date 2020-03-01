from flask_restful import reqparse, Resource, fields, marshal_with
from flask_jwt_extended import current_user, jwt_required
from friend_router.models import db, Location


parser = reqparse.RequestParser()
parser.add_argument('latitude', type=float, required=True)
parser.add_argument('longitude', type=float, required=True)
parser.add_argument('accuracy', type=float, required=True)


location_fields = {
    'latitude': fields.Float,
    'longitude': fields.Float,
    'accuracy': fields.Float,
    'created_at': fields.DateTime
}


class LocationResource(Resource):
    @marshal_with(location_fields, envelope='locations')
    @jwt_required
    def get(self):
        return current_user.locations

    @marshal_with(location_fields, envelope='location')
    @jwt_required
    def post(self):
        args = parser.parse_args()
        location = Location(latitude=args['latitude'],
            longitude=args['longitude'],
            accuracy=args['accuracy'])
        current_user.locations.append(location)
        db.session.commit()
        return location
