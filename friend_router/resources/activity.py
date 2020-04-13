from datetime import datetime

from flask import request
from flask_jwt_extended import current_user
from exponent_server_sdk import PushMessage

from friend_router.models import db, User, Activity
from friend_router.marshmallow import ActivitySchema
from friend_router.expo import send_push_message

from webargs import fields
from webargs.flaskparser import parser

from .auth import AuthResource

activity_args = {
    'destination': fields.Str(required=True),
    'description': fields.Str(required=True),
    'start_time': fields.Time(required=True),
    'participants': fields.List(fields.Str())
}


class ActivityResource(AuthResource):
    def get(self):
        schema = ActivitySchema(many=True)
        return schema.dump(current_user.activities)

    def post(self):
        args = parser.parse(activity_args, request)
        destination = args['destination']
        description = args['description']
        # Create new activity
        activity = Activity(
            destination=destination,
            description=description)
        activity.start_time = datetime.combine(
            datetime.now(), args['start_time'])

        # Insert all participants
        push_messages = []
        for user in args['participants']:
            u = User.get(user)
            # TODO: Check if the user is owner
            # Check if user exist
            if u is None:
                # abort(404)
                continue
            push_messages.extend([PushMessage(
                to=token.token,
                title='Invitation',
                body='Meet at %s, %s' % (destination, description),
                sound='default',
                display_in_foreground=True
            ) for token in u.expo_push_tokens])
            activity.participants.append(u)

        # Insert the activity to the current user
        current_user.activities_owned.append(activity)
        db.session.commit()

        # Send notifications
        if push_messages:
            send_push_message(push_messages)

        schema = ActivitySchema()
        return schema.dump(activity)
