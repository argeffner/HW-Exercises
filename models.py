"""SQLAlchemy models for blogly."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://img1.looper.com/img/gallery/the-worst-thing-thats-ever-happened-to-jerry-on-rick-and-morty/intro-1567519981.jpg"

class User(db.Model):
    """Site user"""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE_URL)

    posts = db.relationship("Post", backref="user", cascade="all, delete-orphan")

    @property
    def full_name(self):
        """Return full name of user."""
        return f"{self.first_name} {self.last_name}"

class Post(db.Model):
    """Posts made by user"""

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    @property
    def friendly_date(self):
        """Return fancy date time."""
        return self.created_at.strftime("%a %b %-d %Y, %-I:%M %p")

def connect_db(app):
    db.app = app
    db.init_app(app)
