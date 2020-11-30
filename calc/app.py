from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route('/add')
def add_num():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    return str(add(a, b))

@app.route('/sub')
def sub_num():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    return str(sub(a, b))

@app.route('/mult')
def mult_num():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    return str(mult(a, b))

@app.route('/div')
def div_num():
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    return str(div(a, b))

# need to give values in the url add?a=31&b=2
# math/div?a=2&b=2

operators = {
  "add": add,
  "sub": sub,
  "mult": mult,
  "div": div,
}

@app.route("/math/<id>")
def choose_operation(id):
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    result = operators[id](a, b)
    return str(result)