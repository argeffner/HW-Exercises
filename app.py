from flask import Flask, request, render_template, redirect, session, jsonify
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "three banana"

boggle_game = Boggle()


@app.route('/')
def homepage():

    # make a game board
    board = boggle_game.make_board()
    #store board onto session storage
    session['board'] = board
    highscore = session.get('highscore', 0)
    numplays = session.get('numplays', 0)

    return render_template('base.html', board=board, 
                                        highscore=highscore,
                                        numplays=numplays)


@app.route('/check')
def word_check():

    word = request.args['word']
    # prior module stated: session['board'] = board
    board = session['board']
    # use def in boggle.py to check board for valid word
    response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': response})

@app.route('/score', methods=["POST"])
def post_score():

    #get scores and number of plays
    score = request.json['score']
    highscore = session.get('highscore', 0)
    numplays = session.get('numplays', 0)

    # add a play counter
    session['numplays'] = numplays + 1
    #set max score identifier: compare current score to saved score and set current score to highscore if it is higher
    session["highscore"] = max(score, highscore)

    return jsonify(newRecord=score > highscore)

