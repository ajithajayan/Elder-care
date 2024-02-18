from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


class AvailabilityConsumer(JsonWebsocketConsumer):
    def update_availability(self, event):
        message = event["message"]
        self.send_json(message)

    def connect(self):
        super().connect()
        practiceID = self.scope.get("url_route").get("kwargs").get("practiceID")
        async_to_sync(self.channel_layer.group_add)(
            "practice_" + str(practiceID), self.channel_name
        )

    def disconnect(self, close_code):
        self.close()
