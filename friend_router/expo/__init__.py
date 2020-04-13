from exponent_server_sdk import DeviceNotRegisteredError
from exponent_server_sdk import PushClient

from friend_router.models import db, ExpoPushToken


# https://github.com/expo/expo-server-sdk-python
# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
def send_push_message(push_messages):
    receipts = PushClient().publish_multiple(push_messages)

    for response in receipts:
        message = response.push_message
        token = message.token
        try:
            response.validate_response()
        except DeviceNotRegisteredError:
            # Mark the push token as inactive
            pushtoken = ExpoPushToken.query.filter_by(token=token).first()
            db.session.delete(pushtoken)
    db.session.commit()
