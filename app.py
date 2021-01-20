from flask import Flask, redirect, render_template, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Feedback
from forms import RegisterForm, FeedbackForm, LoginForm, DeleteForm
from werkzeug.exceptions import Unauthorized

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgres:///flask_feedback"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "Don't"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def homepage():
    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if "username" in session:
        return redirect(f"/users/{session['username']}")

    form = RegisterForm()
   
    if form.validate_on_submit():
        # collects data from the form inputs by user
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        user = User.register(username, password, email, first_name,last_name)
        # don't need db.session.add(user) since it will be stored in session
        db.session.commit()
        session["username"] = user.username
        flash('New User Created!', 'success')
        return redirect(f"/users/{user.username}")
    else:  
        return render_template("register.html", form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if "username" in session:
        return redirect(f"/users/{session['username']}")

    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            flash(f"Welcome Back, {user.username}!", "primary")
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password.']
            return render_template('login.html', form=form)

    return render_template('login.html', form=form)


@app.route('/logout')
def logout():

    session.pop("username")
    return redirect('/login')


@app.route('/users/<username>')
def show_username(username):
    if "username" not in session or username != session['username']:
        # flash('You need to Login or Register')
        # return redirect ('/')
        raise Unauthorized()

    user = User.query.get(username)
    form = DeleteForm()

    return render_template('show.html', user=user, form=form)


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if "username" not in session or username != session['username']:
        # flash('You need to Login or Register')
        # return redirect ('/')
        raise Unauthorized()

    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    # need the session.pop('username') to avoid error message
    session.pop('username')

    return redirect('/login')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    if "username" not in session or username != session['username']:
        # flash('You need to Login or Register')
        # return redirect ('/')
        raise Unauthorized()

    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(username=username, title=title, content=content)
        db.session.add(feedback)
        db.session.commit()
        flash(f"Hey {feedback.username}, Thanks for the feedback", "primary")
        return redirect(f'/users/{feedback.username}')
    else:
        return render_template('add.html', form=form)


@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):

    feedback = Feedback.query.get_or_404(feedback_id)

    if "username" not in session or feedback.username != session['username']:
        # flash('You need to Login or Register')
        # return redirect ('/')
        raise Unauthorized()

    form = FeedbackForm(obj=feedback)
    
    # now passing existing data so use feedback.item = form.item.data
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()
        return redirect(f"/users/{feedback.username}")
    else:
        return render_template('edit.html', form=form, feedback=feedback)


@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):

    feedback = Feedback.query.get(feedback_id)
    if "username" not in session or feedback.username != session['username']:
        # flash('You need to Login or Register')
        # return redirect ('/')
        raise Unauthorized()

    form = DeleteForm()

    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()

    return redirect(f"/users/{feedback.username}")
