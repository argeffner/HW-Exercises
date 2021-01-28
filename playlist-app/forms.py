"""Forms for playlist app."""
from wtforms import SelectField, StringField
from flask_wtf import FlaskForm
from wtforms.validators import InputRequired, Length, NumberRange


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    name = StringField('name', validators=[InputRequired(), Length(min=2, max=20)])
    description = StringField('song description', validators=[InputRequired(), Length(min=5, max=40)])

class SongForm(FlaskForm):
    """Form for adding songs."""

    title = StringField('song title', validators=[InputRequired(), Length(min=2, max=15)])
    artist = StringField('song artist', validators=[InputRequired(), Length(min=2, max=20)])


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
