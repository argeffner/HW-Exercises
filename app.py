from flask import Flask, request, redirect, render_template, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres:///cupcakes"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mycupcakes'

app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)


connect_db(app)

@app.route('/')
def root():

    return render_template("index.html")

@app.route('/api/cupcakes')
def cupcake_data():
    """ return json: 
    {cupcakes: [{id, flavor, rating, size, image}, ...]}
    """
    cupcakes = [cupcake.make_dict() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<int:cupcake_id>')
def cupcake_id(cupcake_id):
    """Choose specific cupcake"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.make_dict())

@app.route('api/cupcakes', methods=['POST'])
def add_cupcakes():
    """add cupcake annd post json based on input"""
    flavor = request.json["flavor"]
    rating = request.json["rating"]
    size = request.json["size"]
    image = request.json["image"]

    new_cupcake = Cupcake(flavor=flavor, rating=rating, size=size, image = image or None)

    db.session.add(new_cupcake)
    db.session.commit()

    return (jsonify(cupcake=new_cupcake), 201)

@app.route('api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcakes(cupcake_id):
    """udpdate and return data for specific cupcake"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    cupcake.flavor = request.json["flavor"]
    cupcake.rating = request.json["rating"]
    cupcake.size = request.json["size"]
    cupcake.image = request.json["image"]

    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake=cupcake.make_dict())

@app.route('api/cupcakes/<int:cupcake_id>', methods=['DELETE'])
def delete_cupcakes(cupcake_id): 
    """Delete a cupcake"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="Deleted")