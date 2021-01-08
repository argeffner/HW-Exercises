from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

OTHER_PHOTO = "https://media2.giphy.com/media/fyx8vjZc2ZvoY/giphy.gif?cid=ecf05e47pl4tkrpuv89rmn9g7y9c15spzurbhc46smlkn7v9&rid=giphy.gif"

class Pet(db.Model):

    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable=False, default=True)

    def image(self):
        return self.photo_url or  OTHER_PHOTO


