from mongoengine import Document, StringField

class Image(Document):
    _id=StringField(required=True)
    filename=StringField(required=True)
    content_type=StringField(required=True)
    imageFile=StringField(required=True)
    user_id=StringField(required=True)