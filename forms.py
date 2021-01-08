from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, TextAreaField, SelectField
from wtforms.validators import InputRequired, Email, Optional, URL, Length, NumberRange

states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

class AddPetForm(FlaskForm):

    # email = StringField("Email", validators=[Optional(), Email()]) if I will need to add in the future
    name = StringField("Pet Name", validators=[InputRequired()])
    species = SelectField("Species", choices=[('cat','Cat'), ('dog', 'Dog'), ('porcu', 'Porcupine')])
    photo_url = StringField("Photo_url", validators=[Optional(), URL()])
    age = IntegerField("Age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField('Comments', validators=[Optional(), Length(min=13)])

class EditPetForm(FlaskForm):

    photo_url = StringField("Photo_url", validators=[Optional(), URL()])
    notes = TextAreaField('Comments', validators=[Optional(), Length(min=13)])
    available = BooleanField("Available?")