from models import Department, Employee, db
from app import app

# create all tables
db.drop_all()
db.create_all()

d1 = Department(dept_code='mktg',dept_name='Marketing', phone='897-9999')
d2 = Department(dept_code='acct',dept_name='Accounting', phone='892-9999')
d3 = Department(dept_code='r&d',dept_name='Research and Development', phone='809-9879')
d4 = Department(dept_code='sls',dept_name='Sales', phone='444-9999')
d5 = Department(dept_code='it',dept_name='Information Technology')

summer = Employee(name='Summer Smith', state='MA', dept_code='mktg')
river = Employee(name='River Humper', state='NY', dept_code='mktg')
joe = Employee(name='Joe Humper', dept_code='acct')
chin = Employee(name='Chin Hoa', state='TX', dept_code='it')
blaire = Employee(name='Blaire Rand', dept_code='sls', state="MI")
larry = Employee(name='Larry David', dept_code='r&d')
johny = Employee(name='Johny Bravo', dept_code='sls', state="WA")

db.session.add_all([d1,d2,d3,d4,d5])

db.session.commit()

db.session.add_all([river,joe,summer,chin,blaire,larry,johny])

db.session.commit()