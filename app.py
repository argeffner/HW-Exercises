from flask import Flask, request, render_template, redirect, flash, session, make_response
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = "one banana"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

RESPONSES_KEY = "responses"
CURRENT_SURVEY_KEY = 'current_survey'

@app.route('/')
def pick_survey_startpage():
    # import data from survey and place in pick survey form
    return render_template("pick-survey.html", surveys=surveys)


@app.route('/', methods=["POST"])
def pick_survey():

    #take code for a survey (incomplete) and store the id. Once the survey is complete the completed survey will be stored as the new id.
    survey_id = request.form['survey_code']

    # prevents individual from retaking the survey again
    if request.cookies.get(f"completed_{survey_id}"):
        return render_template("already-done.html")
    
    # stores the incomplete/complete survey in the surveys app and stores as survey. Then passes the data to store as cookies in the session storage.
    survey = surveys[survey_id]
    session[CURRENT_SURVEY_KEY] = survey_id

    return render_template("home.html", survey=survey)


@app.route('/begin', methods=["POST"])
def start_survey():

    #stores data set into random code and creates cookies of the empty list
    # later on when submitting information in the form the data will be stored as cookies.
    session[RESPONSES_KEY] = []

    return redirect('/questions/0')


@app.route('/answer', methods=["POST"])
def show_answers():
    #saves answer and moves to next question

    # get choice response for submission and text for choice
    choice = request.form['answer']
    text = request.form.get('text', "")

     # add current response to the list in the session
    responses = session[RESPONSES_KEY]
    responses.append({"choice": choice, "text": text})

     # adding response to the session storing the cookies so they can be used in survey.
    session[RESPONSES_KEY] = responses
    survey_code = session[CURRENT_SURVEY_KEY]
    survey = surveys[survey_code]

    # #add response to list (for list you use .append() 
    # #Also now anything that is appended to the list will show up in the cookies
    # responses = session[RESPONSES_KEY]
    # responses.append(choice)
    # session[RESPONSES_KEY] = responses

    # checks to make sure that individual doesn't skip pages or go back
    if (len(responses) == len(survey.questions)):
        # comleted all questions now move to completed page
        return redirect('/complete')
    
    else:
        # return to question page you were on
        return redirect(f'/questions/{len(responses)}')


@app.route('/questions/<int:quid>')
def show_questions(quid):

    # retrieves the data from the cookies that were just stored and store as response and put in survey.
    responses = session.get(RESPONSES_KEY)
    survey_code = session[CURRENT_SURVEY_KEY]
    survey = surveys[survey_code]

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

    #store all data into session storage as cookies
    survey_id = session[CURRENT_SURVEY_KEY]
    survey = surveys[survey_id]
    responses = session[RESPONSES_KEY]

    #need to store data from html 
    html = render_template('complete.html', 
                            survey=survey, 
                            responses=responses)

    # sets the stored response with extra detail to make sure that survey cant be resubmitted or redone after comleting.
    response = make_response(html)
    response.set_cookie(f"completed_{survey_id}", "yes", max_age=75)
    return response 