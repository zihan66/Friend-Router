from flask import current_app
from flask_restful import Resource


class LocationListResource(Resource):
    def get(self):
        return list(current_app.config.get('PREDEFINED_LOCATIONS').keys())
