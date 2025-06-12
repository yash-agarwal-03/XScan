from mongoengine import Document ,StringField

class User(Document):
    _id=StringField(primary_key=True)
    username=StringField(required=True)
    email=StringField(required=True)
    password=StringField(required=True)