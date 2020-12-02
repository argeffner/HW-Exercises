from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import stories

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
debug = DebugToolbarExtension(app)

@app.route('/')
def story_select():
    # choose from list of stories
    return render_template('story-choice.html', stories = stories.values())

@app.route('/fill')
def fill_in():
    # fill in stories with data
    story_id = request.args["story_id"]
    story = stories[story_id]

    prompts = story.prompts

    return render_template('fill.html', 
                            prompts =prompts, 
                            story_id = story_id, 
                            title = story.title)

@app.route('/story')
def story_made():
    # generates a story
    story_id = request.args["story_id"]
    story = stories[story_id]

    text = story.generate(request.args)

    return render_template('story.html', 
                            text = text, 
                            title = story.title)