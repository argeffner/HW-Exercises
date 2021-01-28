"""Models for Playlist app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Playlist(db.Model):
    """Playlist."""
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    description =db.Column(db.Text, nullable=False)

    songs = db.relationship("Song", backref="playlists")

class Song(db.Model):
    """Song."""
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    artist =db.Column(db.Text, nullable=False)


class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""
    __tablename__ = 'playlistsongs'
    # All items are primary keys (foreign keys are primary keys)
    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    playlist_id =db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=False)

# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    db.app = app
    db.init_app(app)