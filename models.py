
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE_URL =  'https://tinyurl.com/demo-cupcake'

class Cupcake(db.Model):

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.Text, nullable=False) 
    # Default value doesn't work and I don't understand why
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float,nullable=False)
    image = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE_URL)

    def make_dict(self):

        return {
            "id": cupcakes.id,
            "flavor": cupcakes.flavor,
            "size": cupcakes.size,
            "rating": cupcakes.rating,
            "image": cupcakes.image,
        }

def connect_db(app):
    db.app = app
    db.init_app(app)