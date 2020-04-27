from flask import request
from flask_jwt_extended import current_user
from exponent_server_sdk import PushMessage

from friend_router.models import Activity
from friend_router.expo import send_push_message

from webargs import fields
from webargs.flaskparser import parser

from .auth import AuthResource

accept_args = {
    'id': fields.Int(required=True)
}


class AcceptActivityResource(AuthResource):
    def post(self):
        args = parser.parse(accept_args, request)
        id = args['id']

        activity = Activity.query.get(id)
        owner = activity.owner
        destination = activity.destination
        description = activity.description

        title = 'Invitation accepted from %s' % (current_user.first_name)
        body = 'Your invitation: Meet at %s, %s' % (destination, description)
        push = [PushMessage(
                to=token.token,
                title=title,
                body=body,
                sound='default',
                display_in_foreground=True,
                data={'title': title}
                ) for token in owner.expo_push_tokens]

        # Send notifications
        if push:
            send_push_message(push)

        return {'msg': 'ok'}
