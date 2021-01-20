from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, Optional, Length, NumberRange


class RegisterForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(), Length(min=2, max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=7, max=50)])
    email = StringField("Email Address", validators=[InputRequired(), Email(), Length(max=50)])
    first_name = StringField("first name", validators=[InputRequired(), Length(max=30)])
    last_name = StringField("last name", validators=[InputRequired(), Length(max=30)])


class FeedbackForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired(), Length(max=100)])
    content = StringField('content', validators=[InputRequired()])

class LoginForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired(), Length(min=2, max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=7, max=50)])

class DeleteForm(FlaskForm):
    """Delete form -- this form is intentionally blank."""
    # need to put commentary above to prevent EOF error
