from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField

states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
class AddSnackForm(FlaskForm):

    name = StringField("Snack Name")
    price = FloatField("Price in US Dollars")
    quantity = IntegerField("How many?")
    is_healthy = BooleanField("This is a healthy snack")
    
    # category = RadioField("Category", choices=[('icy','ice cream'), ('chips', 'potato chips'), ('g', 'goat')])

    category = SelectField("Category", choices=[('icy','ice cream'), ('chips', 'potato chips'), ('g', 'goat')])

class NewEmployeeForm(FlaskForm):

    name = StringField('Employee Name')
    state = SelectField('State', choices=[(st, st) for st in states])
    dept_code = SelectField("Department Code")