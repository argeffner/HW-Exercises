from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "one banana"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

RESPONSES_KEY = "responses"

@app.route('/')
def start_page():
    # import data from survey
    return render_template("home.html", survey=survey)


@app.route('/begin', methods=["POST"])
def start_survey():

    session[RESPONSES_KEY] = []

    return redirect('/questions/0')

@app.route('/answer', methods=["POST"])
def show_answers():
    #saves answer and moves to next question

    # get choice response for submission
    choice = request.form['answer']

    #add response to list (for list you use .append() )
    responses = session[RESPONSES_KEY]
    responses.append(choice)
    session[RESPONSES_KEY] = responses

    if (len(responses) == len(survey.questions)):
        # comleted all questions now move to completed page
        return redirect('/complete')
    
    else:
        # return to question page you were on
        return redirect(f'/questions/{len(responses)}')


@app.route('/questions/<int:quid>')
def show_questions(quid):

    responses = session.get(RESPONSES_KEY)

    # set up process based on questions either moves to homepage, question<index> page or completepage

    if (responses is None):
        #returns to main page if there is nothing
        return redirect('/')
    
    if (len(responses) == len(survey.questions)):
        # comleted all questions now move to completed page
        return redirect('/complete')

    if (len(responses) != quid):
        # returns error for incorrect question and returns to question page you were on 
        flash(f"incorrect question id: {quid}.")
        return redirect(f'/questions/{len(responses)}')

    question = survey.questions[quid]
        #import data from question class in survey
    return render_template('questions.html', qnum=quid, question=question)


@app.route('/complete')
def complete():

    return render_template('complete.html')